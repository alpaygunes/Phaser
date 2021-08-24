'use strict'

class Cell extends Phaser.GameObjects.Graphics {
    options; 
    markAsNext = false;
    circle;
    orbital;
    shape;
    id;
    constructor(scene, options) {
        super(scene, options);
        this.options = options
        // ...
        //scene.add.existing(this);
    } 

    agCreate(){   

        this.orbital            = new Phaser.Curves.Path( ); 
        this.orbital.add(new Phaser.Curves.Ellipse( 0, 0, this.options.height));  
        this.orbital.draw(this); 
        
        /*this.path            = new Phaser.Curves.Path( ); 
        this.path.add(new Phaser.Curves.Ellipse( 0, 0, this.options.height));  
        this.path.draw(this); */

        this.fillStyle(0xffffff);
        this.circle = new Phaser.Geom.Circle(0,0,this.options.height); 
        this.fillCircleShape(this.circle);
        
 

        this.shape   = new Phaser.Geom.Circle(0, 0, this.options.height); 
        this.setInteractive(this.shape,Phaser.Geom.Circle.Contains);
        return this;
    }


    agMarkAsNext(){  
        this.markAsNext = !this.markAsNext
        this.clear() 
        this.fillStyle(0xff0000);
        this.circle = new Phaser.Geom.Circle(0,0,this.options.height); 
        this.fillCircleShape(this.circle); 
        if(this.markAsNext){
            this.fillStyle(0xff0000);
        }else{
            this.fillStyle(0xff0000);
        } 
    }

    agUnMarkAsNext(){  
        this.markAsNext = false
        this.clear() 
        this.fillStyle(0xffffff);
        this.circle = new Phaser.Geom.Circle(0,0,this.options.height); 
        this.fillCircleShape(this.circle);  
    }

     /*preUpdate(time, delta) {  
         debugger
     }*/
}