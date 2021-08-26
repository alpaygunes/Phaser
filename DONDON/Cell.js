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
        scene.add.existing(this);
    } 

    agCreate(){   
        this.orbital            = new Phaser.Curves.Path(); 
        let elips               = new Phaser.Curves.Ellipse( this.options._x, this.options._y, this.options.height)
        this.orbital.add(elips);  
        this.orbital.draw(this); 
        
        this.fillStyle(0xffffff);
        this.circle             = new Phaser.Geom.Circle(this.options._x, this.options._y,this.options.height); 
        this.fillCircleShape(this.circle);
        
        this.shape              = new Phaser.Geom.Circle(this.options._x, this.options._y, this.options.height); 
        this.setInteractive(this.shape,Phaser.Geom.Circle.Contains);
        return this;
    }


    agMarkAsNext(){  
        this.markAsNext = !this.markAsNext
        this.clear() 
        this.fillStyle(0xff0000);
        this.circle = new Phaser.Geom.Circle(this.options._x, this.options._y,this.options.height); 
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
        console.log(this.options._x, this.options._y)
        this.circle = new Phaser.Geom.Circle(this.options._x, this.options._y,this.options.height); 
        this.fillCircleShape(this.circle);  
    }

     /*preUpdate(time, delta) {  
         debugger
     }*/
}