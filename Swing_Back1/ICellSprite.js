'use strict'

class ICellSprite extends Phaser.GameObjects.Sprite {

    name            ;
    is_next_cell    = false ;
    visibility      = true  ;
    orbital         ;
    options         ;
    is_next_cell    = false;
    revards         = [];

    constructor(config) {
        super(config.scene, config.options.x, config.options.y, config.texture);
        this.name       = (Math.random() + 1).toString(36).substring(7);  
        this.options    = config.options 
        this.scale      = 2*this.options.radius/this.width
        config.scene.events.on('unmark_all_as_next', ()=>{ 
            this.unMarkAsNext()
        }); 
        this.createEdgeRevards()
    }
    
    setOrbitalPath( angle) { 
        let path;
        path        = new Phaser.Curves.Ellipse(this.options.x, this.options.y, this.options.radius)
        path.angle  = angle; 
        return path
    }

    markAsNext(){
        if(this.is_next_cell) return;
        this.setDepth(this.scene.cell_group.children.size)
        this.is_next_cell   = true;  
        this.setAlpha(0.2)
    }

    unMarkAsNext(){
        if(this.is_next_cell == false) return; 
        this.setDepth(0)
        this.is_next_cell = false; 
        this.setAlpha(1)
    }

    createEdgeRevards(){
        const path          = new Phaser.Curves.Ellipse(this.x, this.y, this.options.radius*0.85);
        for (let i = 0.05; i <= 1; i+=0.1) {  
            let point       = path.getPoint(i)  
            let diamond     = this.scene.add.sprite(point.x, point.y, 'diamond');
            diamond.setAngle(360*i+90)
            diamond.scale   = 1 
            diamond.setDepth(this.depth+1) 
            Phaser.Utils.Array.Add(this.revards, diamond);
        } 
    }

    preUpdate(time, delta) {  
        if(this.scene.slide == 'up'){
            this.y          +=0.2 
            this.options.y  +=0.2 

            Phaser.Utils.Array.Each(this.revards,(reward)=>{ 
                reward.y    +=0.2
            })
        }
    }
}