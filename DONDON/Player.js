'use strict'

class Player extends Phaser.GameObjects.Graphics {
    options;
    targetCell;
    currentCell;
    orbital;
    tweens;
    follower;
    circle;
    tw;
    constructor(scene, options) {
        super(scene, options);
        this.options = options
        // ...
        //scene.add.existing(this);
    }

    agCreate() {
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.tw = this.scene.tweens.add({
            targets: this.follower,
            t: 1,
            ease: 'Linear',
            duration: 10000,
            repeat: -1,
        });
        return this;
    }

    preUpdate(time, delta) { 
        this.orbital = this.currentCell.orbital;
        this.orbital.getPoint(this.follower.t, this.follower.vec);
        let x = (this.currentCell.x + this.follower.vec.x);
        let y = (this.currentCell.y + this.follower.vec.y);
        this.clear()
        this.fillStyle(0xffffff);
        this.circle = new Phaser.Geom.Circle(x, y, this.options.height);
        this.fillCircleShape(this.circle);
        this.changeCell();
    }

    changeCell() {
        this.scene.group.children.each(function (c) {
            let cell = c
            // mevcut cell hariç diğerlerini kontrol edelim
            if (cell.id != this.currentCell.id) {
                if (Phaser.Geom.Intersects.CircleToCircle(this.circle, cell.circle)) {
                    if (cell.markAsNext) { 
                        if (this.follower.t.toFixed(2) == 0.00) { // sağ 
                            cell.orbital.curves[0].angle = 180 
                            this.currentCell = cell 
                            this.tw.restart()
                        } else if (this.follower.t.toFixed(2) == 0.25) { // alt 
                            cell.orbital.curves[0].angle = 270 
                            this.currentCell = cell 
                            this.tw.restart()
                        } else if (this.follower.t.toFixed(2) == 0.50) { // sol 
                            cell.orbital.curves[0].angle = 0 
                            this.currentCell = cell
                            this.tw.restart() 
                        } else if (this.follower.t.toFixed(2) == 0.75) { // üst 
                            cell.orbital.curves[0].angle = 90 
                            this.currentCell = cell 
                            this.tw.restart()
                        }
                    }
                }
            }
        }, this);
    }
}