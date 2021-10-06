'use strict'

class IPlayerSprite extends Phaser.GameObjects.Sprite {

    name            ; 
    visibility      = true  ;
    orbital         ;
    options         ;  
    hit_area        ;
    cell            ; 
    follower        ;
    count           = 0;
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


}