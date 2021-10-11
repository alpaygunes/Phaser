'use strict'

class ITailSprite extends Phaser.GameObjects.Sprite {

    name;  
    player;

    constructor(config) {
        super(config.scene, config.options.x, config.options.y, config.texture);
        this.name       = (Math.random() + 1).toString(36).substring(7);  
        this.options    = config.options 
        this.scale      = 2*this.options.radius/this.width ; 
    }   

}