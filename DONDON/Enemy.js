'use strict'

class Enemy extends Phaser.GameObjects.Graphics {
    options; 
    current_cell;
    orbital;
    follower;
    body_circle;
    sensitivity = 0.002;
    speed       = 500; //  = 1/ms  
    count       = 9999999999999;
    constructor(scene, options) {
        super(scene, options);
        this.options = options
        // ...
        //scene.add.existing(this);
    }

    agCreate() {
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        return this;
    }

    preUpdate(time, delta) {
        if (this.mov_const == '+') {
            this.count += (1 / this.speed)
        } else {
            this.count -= (1 / this.speed)
        }
        this.follower.t = this.count % 1 
        this.orbital = this.current_cell.orbital;
        this.orbital.getPoint(this.follower.t, this.follower.vec);
        let x = (this.current_cell.x + this.follower.vec.x);
        let y = (this.current_cell.y + this.follower.vec.y);
        this.clear() 
        this.body_circle = new Phaser.Geom.Circle(x, y, this.options.height);
        this.fillCircleShape(this.body_circle);
        this.changeCell();
    }

    changeCell() {
        //eğer geçiş noktalarına gelmediyse boşuna yorulma çık
        if (!(
            (this.follower.t.toFixed(3) >= (0.00 - this.sensitivity) && this.follower.t.toFixed(3) <= (0.00 + this.sensitivity))
            || (this.follower.t.toFixed(3) >= (0.25 - this.sensitivity) && this.follower.t.toFixed(3) <= (0.25 + this.sensitivity))
            || (this.follower.t.toFixed(3) >= (0.50 - this.sensitivity) && this.follower.t.toFixed(3) <= (0.50 + this.sensitivity))
            || (this.follower.t.toFixed(3) >= (0.75 - this.sensitivity) && this.follower.t.toFixed(3) <= (0.75 + this.sensitivity))
        )) {
            return;
        }
        this.scene.cell_group.children.each(function (c) {
            let cell = c
            // mevcut cell hariç diğerlerini kontrol edelim
            if (cell.id != this.current_cell.id) {
                if (Phaser.Geom.Intersects.CircleToCircle(this.body_circle, cell.body_circle)) {
                    if (cell.markAsNext) {
                        // üsttekine geçiş oluyorsa
                        if (cell.body_circle.y > this.current_cell.body_circle.y) {
                            cell.orbital.curves[0].angle = 270
                        }

                        // sağdakine geçiş oluyorsa
                        if (cell.body_circle.x > this.current_cell.body_circle.x) {
                            cell.orbital.curves[0].angle = 180
                        }

                        // aşağı geçiş oluyorsa
                        if (cell.body_circle.y < this.current_cell.body_circle.y) {
                            cell.orbital.curves[0].angle = 90
                        }

                        // soldakine geçiş oluyorsa
                        if (cell.body_circle.x < this.current_cell.body_circle.x) {
                            cell.orbital.curves[0].angle = 0
                        }

                        this.current_cell = cell
                        //this.tw.restart() 0  
                        this.count = 99999999
                        this.switchMovement();
                    }
                }
            }
        }, this);
    } 

    // hücre içinde iken iki defa tıklaynınca hareketin yönünü değiştir
    switchMovement() {
        //debugger
        this.mov_const = (this.mov_const == '+') ? '-' : '+'
    }
}