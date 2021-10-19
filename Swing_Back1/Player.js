'use strict'

class Player extends IPlayerSprite {

    tails       = [];
    path_points = [];

    constructor(scene, options) {
        super(scene, options);
        this.name = 'Player_' + (Math.random() + 1).toString(36).substring(7);
        this.scene.sound_walk.play();
    }

    isIntersecToReward(){
        Phaser.Utils.Array.Each(this.cell.revards,(revard)=>{
            if (Phaser.Geom.Intersects.RectangleToRectangle(this.scene.player.getBounds(), revard.getBounds())) {
                Phaser.Utils.Array.Remove(this.cell.revards,revard)
                revard.destroy() 
                this.scene.sound_yut.play();
                if(!this.cell.revards.length){
                    this.addNewToTail()
                }
            }
        })
    }

    addNewToTail(){
        let options = {
            x: this.x,
            y: this.y,
            radius: 5,
            fillStyle: {
                color: 0xff9999,
                alpha: 1
            } 
        }
        let options_ = Object.assign({}, options)  
        let tail     = new ITailSprite({ scene: this.scene, texture: 'tail', options: options_ }); 
        tail.player  = this
        tail.setDepth(this.depth+999) 
        Phaser.Utils.Array.Add(this.tails, tail); 
        this.scene.add.existing(tail);
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
    
    fallowedTails(){
        if(!this.tails.length) return;
        const aralik = 0.03*this.speed
        let i   = aralik;
        Phaser.Utils.Array.Each(this.tails,(tail)=>{  
            tail.x = this.path_points[i].x 
            tail.y = this.path_points[i].y  
            i      += aralik;
        })
    }

    preUpdate(time, delta) {  
        if(this.stop) return;
        this.isIntersecToReward(); 
        this.fallowedTails();
        if (this.hareket_yonu == '+') {
            this.count += (1 / this.speed)
        } else {
            this.count -= (1 / this.speed)
        }

        this.follower.t = this.count % 1
        this.orbital.getPoint(this.follower.t, this.follower.vec);
        this.x          = this.follower.vec.x;
        this.y          = this.follower.vec.y;

 
         
        Phaser.Utils.Array.AddAt(this.path_points,new Phaser.Geom.Point(this.x,this.y),0) 
        if(this.path_points.length>1000){
            this.path_points.splice(-1);
        }

        if(this.scene.slide){ 
            Phaser.Utils.Array.Each(this.path_points,(path_point)=>{   
                path_point.y += this.cell.slide_speed   
            })
        }

 
         
        if (Math.abs(this.follower.t) >= 0.125 && Math.abs(this.follower.t) <= 0.130) {
            this.can_pass = true;
        }
        
        this.changeCellIsItPossible(); 
        if(this.scene.slide != null){
            this.orbital     = this.cell.setOrbitalPath(this.orbital.angle) 
        } 
    }
    
}