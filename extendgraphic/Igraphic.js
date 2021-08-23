'use strict'

class Halka extends Phaser.GameObjects.Graphics {
    constructor(scene, options) {
        super(scene, options);
        // ...
        //scene.add.existing(this);
    } 

    getHalka(){
        let path            = new Phaser.Curves.Path( ); 
        path.add(new Phaser.Curves.Ellipse( 50, 50, 50));  
        path.draw(this); 
        return this;
    }

     preUpdate(time, delta) {  
        this.setX(this.x+2)    
        if(this.x>300){ 
            this.clear() 
            let path            = new Phaser.Curves.Path( );
            path.add(new Phaser.Curves.Ellipse( 50, 50, 50));  
            this.fillStyle(0xff0000, 1);
            this.fillCircle( 50, 50, 50); 
            path.draw(this); 
        }
     }
}