'use strict'

class Cell extends Phaser.GameObjects.Graphics {

    name                    ;
    outline                 ;
    inline                  ;
    orbital                 ;
    hit_area                ;
    is_next_cell    = false ;
    visibility      = true  ;

    constructor(scene, options) {
        super(scene, options); 
        this.options    = options
        this.name       = (Math.random() + 1).toString(36).substring(7);  
        scene.events.on('unmark_all_as_next', ()=>{ 
            this.unMarkAsNext()
        });
        this.setX(0)
        this.setY(0)
        scene.add.existing(this);
        this.draw()

        setInterval(() => {
            this.removeInteractive() 
        }, 500);
    }

    draw(){
        this.addHitArea();
        this.addOutLine();
        this.addInLine();
        this.addOrbital();
    }

    addHitArea(){ 
        if(this.is_next_cell){
            this.fillStyle('0xffffff', 1.0);
        }else{
            this.fillStyle('0x9FB798', 1.0);
        }
        this.hit_area   = new Phaser.Geom.Circle(this.options.x, this.options.y, this.options.radius);
        this.fillCircleShape(this.hit_area);   
        this.setInteractive(this.hit_area, Phaser.Geom.Circle.Contains);  
    }

    addOutLine(){ 
        this.lineStyle(1, '0xff00ff', 1.0);
        this.outline   = new Phaser.Geom.Circle(this.options.x, this.options.y, this.options.radius+5);
        this.strokeCircleShape(this.outline); 
    }

    addInLine(){ 
        this.lineStyle(1, '0xff00ff', 1.0);
        this.inline   = new Phaser.Geom.Circle(this.options.x, this.options.y, this.options.radius-5);
        this.strokeCircleShape(this.inline); 
    }

    addOrbital(){  
        this.orbital = new Phaser.Curves.Path();
    }

    setOrbitalPath(name, angle) { 
        let path;
        let curves = this.orbital.curves
        for (let index = 0; index < curves.length; index++) {
            if (this.orbital.curves[index].name == name) {
                this.orbital.curves[index].angle = angle;
                path = this.orbital.curves[index];
                break;
            }
        }

        if (!path) {
            path = new Phaser.Curves.Ellipse(this.options.x, this.options.y, this.options.radius)
            path.angle  = angle;
            path.name   = name;
            this.orbital.add(path);
        }
        return path
    }

    setVisible(visibility){
        this.visibility = visibility
        if(!visibility){
            this.clear(); 
            this.orbital    = null
            this.outline    = null
            this.inline     = null
            this.hit_area   = null
        }else{
            this.draw();
        }
    }

    unMarkAsNext(){
        if(this.is_next_cell == false) return; 
        this.setDepth(0)
        this.is_next_cell = false; 
        this.clear()
        this.addHitArea();
        this.addOutLine();
        this.addInLine();  
    }

    markAsNext(){
        if(this.is_next_cell) return;
        this.setDepth(this.scene.cell_group.children.size)
        this.is_next_cell   = true; 
        this.clear()
        this.fillStyle('0xffffff', 1.0);
        this.addHitArea();
        this.addOutLine();
        this.addInLine();  
        this.fillStyle('0x9FB798', 1.0);
    }

    preUpdate(time, delta) { 
        this.clear();  
        this.options.y -= 0.1;
        if(this.scene.player?.cell == this){
            this.scene.player.orbital = this.setOrbitalPath(this.scene.player.name, this.scene.player.orbital.angle);
        }
        this.draw();
    }

}