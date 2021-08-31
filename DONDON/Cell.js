'use strict'

class Cell extends Phaser.GameObjects.Graphics {
    options; 
    markAsNext = false;
    body_circle;
    orbital;
    hit_area_shape;
    id;
    constructor(scene, options) {
        super(scene, options);
        this.options = options
        // ...
        scene.add.existing(this);
    } 

    agCreate(){   
        this.orbital            = new Phaser.Curves.Path(); 
        let elips               = new Phaser.Curves.Ellipse( this.options._x, this.options._y, this.options.height)  
        this.orbital.add(elips);  
        this.orbital.draw(this); 
         
        this.body_circle             = new Phaser.Geom.Circle(this.options._x, this.options._y,this.options.height); 
        this.fillCircleShape(this.body_circle);
        
        this.hit_area_shape              = new Phaser.Geom.Circle(this.options._x, this.options._y, this.options.height); 
        this.setInteractive(this.hit_area_shape,Phaser.Geom.Circle.Contains);
        return this;
    }


    agMarkAsNext(){  
        this.markAsNext = !this.markAsNext
        this.clear() 
        this.fillStyle(0x123456);
        this.body_circle = new Phaser.Geom.Circle(this.options._x, this.options._y,this.options.height); 
        this.fillCircleShape(this.body_circle); 
        this.fillStyle(this.options.fillStyle.color);
    }

    agUnMarkAsNext(){
        this.markAsNext = false
        this.clear()  
        this.body_circle = new Phaser.Geom.Circle(this.options._x, this.options._y,this.options.height); 
        this.fillCircleShape(this.body_circle);  
    }

     /*preUpdate(time, delta) {  
         debugger
     }*/
}