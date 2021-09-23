'use strict'

class Circle extends Phaser.GameObjects.Graphics {

    hit_area;
    cell;
    orbital;
    follower;
    count        = 9999999999999;
    speed        = 50; //  = 1/ms  
    hareket_yonu = '+'

    constructor(scene, options) {
        super(scene, options);  
        this.options    = options 
        this.follower   = { t: 0, vec: new Phaser.Math.Vector2() };
        this.setX(0)
        this.setY(0)
        this.addHitArea(); 
        this.addCenterPoint();
    } 
 
    addHitArea(){ 
        this.hit_area   = new Phaser.Geom.Circle(this.options.x, this.options.y, this.options.radius);
        this.fillCircleShape(this.hit_area);
        this.setInteractive(this.hit_area, Phaser.Geom.Circle.Contains); 
    }

    addCenterPoint(){ 
        this.fillStyle('0xff0000', 1.0);
        this.center_point   = new Phaser.Geom.Circle(this.options.x, this.options.y, 1);
        this.fillCircleShape(this.center_point);
        this.setInteractive(this.center_point, Phaser.Geom.Circle.Contains); 
        this.fillStyle('0x9FB798', 1.0);
    }

    switchMovement() { 
        this.hareket_yonu = (this.hareket_yonu == '+') ? '-' : '+'
    }

}