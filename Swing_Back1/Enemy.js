'use strict'

class Enemy extends IPlayerSprite {

    can_pass        = false
    movement_type   = null

    constructor(scene, options) {
        super(scene, options);
        this.name = 'Enemy_' + (Math.random() + 1).toString(36).substring(7);
    }

    changeCellIsItPossible() {
        if (this.movement_type == 'circular' || this.movement_type == 'yoyo') return; // tipi varsa  hücre değiştirme
        if (!this.can_pass) return
        this.scene.cell_group.children.each(function (cell) {
            if (cell.name != this.cell.name && cell.visibility) {
                let center_circle = new Phaser.Geom.Circle(this.x, this.y, 1)
                if (Phaser.Geom.Intersects.CircleToRectangle(center_circle, cell.getBounds())) {
                    let intersec_points = Phaser.Geom.Intersects.GetCircleToRectangle(center_circle, cell.getBounds())
                    const rate      = Math.random()
                    if (rate < 0.50 && intersec_points.length) {
                        let angle   = Math.atan2((intersec_points[0].y - cell.y), (intersec_points[0].x - cell.x)) * 180 / Math.PI;
                        this.cell   = cell;
                        this.orbital = cell.setOrbitalPath(angle);
                        this.count  = 0;
                        this.switchMovement();
                        this.can_pass = false
                    }
                }
            }
        }, this)
    }

    isIntersecToPlayer(){
        if(this.cell != this.scene.player?.cell) return;
        if(this == this.scene.player) return;
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.scene.player.getBounds(), this.getBounds())) {
            console.log("Çarptı") 
            this.scene.sound_loss.play(); 
            this.scene.sound_walk.stop();
            this.scene.stop         = true
            this.stop               = true 
            this.scene.player.stop  = true
            //all enemies set stop true
            this.scene.enemy_group.children.each((enemy)=>{
                enemy.stop = true; 
            })
        }
    }
  
    preUpdate(time, delta) {
        if(this.stop) return;
        this.isIntersecToPlayer(); 
        if (this.movement_type == null || this.movement_type == 'circular') {  
            if (this.hareket_yonu == '+') {
                this.count += (1 / this.speed)
            } else {
                this.count -= (1 / this.speed)
            }
            this.follower.t = this.count % 1
            this.orbital.getPoint(this.follower.t, this.follower.vec);
            this.x = this.follower.vec.x;
            this.y = this.follower.vec.y;

            if (Math.abs(this.follower.t) >= 0.125 && Math.abs(this.follower.t) <= 0.130) {
                this.can_pass = true;
            }
        }else if (this.movement_type == 'yoyo') {  
            if (this.hareket_yonu == '+') {
                this.count += (1 / this.speed)
            } else {
                this.count -= (1 / this.speed)
            }
             
            this.follower.t = Math.cos(this.count)/2 + .5

            this.orbital.getPoint(this.follower.t, this.follower.vec);
            this.x = this.follower.vec.x;
            this.y = this.follower.vec.y;
        }


        this.changeCellIsItPossible();
        if (this.scene.slide != null) {
            this.orbital = this.cell.setOrbitalPath(this.orbital.angle)
        }
    }

}