'use strict'

class Player extends IPlayerSprite {
    constructor(scene, options) {
        super(scene, options);
        this.name = 'Player_' + (Math.random() + 1).toString(36).substring(7);
        scene.scene.sound_walk.play();
    }

    isIntersecToReward(){
        Phaser.Utils.Array.Each(this.cell.revards,(revard)=>{
            if (Phaser.Geom.Intersects.RectangleToRectangle(this.scene.player.getBounds(), revard.getBounds())) {
                Phaser.Utils.Array.Remove(this.cell.revards,revard)
                revard.destroy() 
                this.scene.sound_yut.play();
            }
        })
    }

    changeCellIsItPossible() {
        this.scene.cell_group.children.each(function (cell) {
            if (cell.name != this.cell.name && cell.visibility) {
                let center_circle       = new Phaser.Geom.Circle(this.x, this.y, 1)
                if (Phaser.Geom.Intersects.CircleToRectangle(center_circle, cell.getBounds())) {
                    let intersec_points = Phaser.Geom.Intersects.GetCircleToRectangle(center_circle, cell.getBounds()) 
                    if (cell.is_next_cell) {
                        let angle       = Math.atan2((intersec_points[0].y - cell.y) , (intersec_points[0].x - cell.x)) * 180 / Math.PI;
                        this.cell       = cell;
                        this.orbital    = cell.setOrbitalPath(angle);
                        this.count      = 0;
                        this.switchMovement();
                    }
                }
            }
        }, this)
    }

    preUpdate(time, delta) {  
        this.isIntersecToReward(); 
        if (this.hareket_yonu == '+') {
            this.count += (1 / this.speed)
        } else {
            this.count -= (1 / this.speed)
        }

        this.follower.t = this.count % 1
        this.orbital.getPoint(this.follower.t, this.follower.vec);
        this.x          = this.follower.vec.x;
        this.y          = this.follower.vec.y;
        
        if (Math.abs(this.follower.t) >= 0.125 && Math.abs(this.follower.t) <= 0.130) {
            this.can_pass = true;
        }
        
        this.changeCellIsItPossible(); 
        if(this.scene.slide != null){
            this.orbital     = this.cell.setOrbitalPath(this.orbital.angle) 
        } 
    }
    
}