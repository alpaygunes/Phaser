'use strict'

class IPlayerSprite extends Phaser.GameObjects.Sprite {

    name            ; 
    visibility      = true  ;
    orbital         ;
    options         ;  
    hit_area        ;
    cell            ; 
    follower        ;
    count           = 9999999999999;
    speed           = 50; //  = 1/ms  
    hareket_yonu    = '+';
    follower        ;

    constructor(config) {
        super(config.scene, config.options.x, config.options.y, config.texture);
        this.name       = (Math.random() + 1).toString(36).substring(7);  
        this.options    = config.options 
        this.scale      = 2*this.options.radius/this.width ;
        this.follower   = { t: 0, vec: new Phaser.Math.Vector2() };
    }  

    switchMovement() { 
        this.hareket_yonu = (this.hareket_yonu == '+') ? '-' : '+'
    }

    isIntersecToPlayer(){
        if(this.cell != this.scene.player?.cell) return;
        if(this == this.scene.player) return;
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.scene.player.getBounds(), this.getBounds())) {
            console.log("Çarptı")
        }
    }

    preUpdate(time, delta) { 
        this.isIntersecToPlayer();
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