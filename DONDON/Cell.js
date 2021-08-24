'use strict'

class Cell extends Phaser.GameObjects.Graphics {
    options; 
    markAsNext = false;
    constructor(scene, options) {
        super(scene, options);
        this.options = options
        // ...
        //scene.add.existing(this);
    } 

    agCreate(){ 
        let path            = new Phaser.Curves.Path( ); 
        path.add(new Phaser.Curves.Ellipse( 0, 0, this.options.height));  
        path.draw(this); 

        var shape   = new Phaser.Geom.Circle(0, 0, this.options.height);
        this.setInteractive(shape,Phaser.Geom.Circle.Contains);
        this.on('pointerdown', ()=>{  
            this.agMarkAsNext()
        });
        return this;
    }


    agMarkAsNext(){    
        this.markAsNext = true
        this.clear()
        let path = new Phaser.Curves.Path(); 
        path.add(new Phaser.Curves.Ellipse( 0, 0, 20));  
        this.lineStyle(2,0xff0000,1)
        path.draw(this); 
    }

     /*preUpdate(time, delta) {  
     }*/
}