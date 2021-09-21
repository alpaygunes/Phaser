'use strict'

class Cell extends Phaser.GameObjects.Graphics {

    name;
    outline;
    inline;
    orbital;
    hit_area;

    constructor(scene, options) {
        super(scene, options); 
        this.options    = options
        this.name       = (Math.random() + 1).toString(36).substring(7); 
        this.addHitArea();
        this.addOutLine();
        this.addInLine();
        this.addOrbital();
        scene.add.existing(this);
    }

    addHitArea(){ 
        this.hit_area   = new Phaser.Geom.Circle(0, 0, this.options.radius);
        this.fillCircleShape(this.hit_area);
        this.setInteractive(this.hit_area, Phaser.Geom.Circle.Contains); 
    }

    addOutLine(){ 
        this.lineStyle(1, '0xff00ff', 1.0);
        this.outline   = new Phaser.Geom.Circle(0, 0, this.options.radius+5);
        this.strokeCircleShape(this.outline); 
    }

    addInLine(){ 
        this.lineStyle(1, '0xff00ff', 1.0);
        this.inline   = new Phaser.Geom.Circle(0, 0, this.options.radius-5);
        this.strokeCircleShape(this.inline); 
    }

    addOrbital(){ 
        this.lineStyle(2, '0xffffff', 1.0);
        this.orbital   = new Phaser.Geom.Circle(0, 0, this.options.radius);
        this.strokeCircleShape(this.orbital); 
    }
 
}