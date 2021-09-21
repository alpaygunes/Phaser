'use strict'

class Cell extends Phaser.GameObjects.Graphics {

    options;
    markAsNext = false;
    body_circle;
    orbital;
    hit_area_shape;
    //txt;
    turu_tamam = false
    path_circles = []; 
    treasure;

    constructor(scene, options) {
        super(scene, options);
        this.options = options
        this.name = (Math.random() + 1).toString(36).substring(7);
        // ...
        scene.add.existing(this);
        this.createPathCircles()
        this.addCuval()
    }

    agCreate() {
        this.orbital = new Phaser.Curves.Path();

        this.body_circle = new Phaser.Geom.Circle(this.options._x, this.options._y, this.options.height);
        this.strokeCircleShape(this.body_circle);

        this.hit_area_shape = new Phaser.Geom.Circle(this.options._x, this.options._y, this.options.height);
        this.setInteractive(this.hit_area_shape, Phaser.Geom.Circle.Contains);

        //this.txt = new MyText(this.scene, this.options._x, this.options._y, null, { color: '#DCE2AA' }); 
        return this;
    }

    agMarkAsNext() {
        this.setDepth(this.scene.cell_group.children.size)
        this.markAsNext = !this.markAsNext
        this.clear()
        this.lineStyle(this.options.lineStyle.width, this.options.cell_body_border_next_color, 1.0);
        this.body_circle = new Phaser.Geom.Circle(this.options._x, this.options._y, this.options.height);
        this.strokeCircleShape(this.body_circle);
    }

    agUnMarkAsNext() {
        this.setDepth(0)
        this.markAsNext = false
        this.clear()
        this.body_circle = new Phaser.Geom.Circle(this.options._x, this.options._y, this.options.height);
        this.strokeCircleShape(this.body_circle);;
    }

    getOrbitalPath(name, angle) {

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
            path = new Phaser.Curves.Ellipse(this.options._x, this.options._y, this.options.height)
            path.angle = angle;
            path.name = name;
            this.orbital.add(path);
            //this.orbital.draw(this);
        }
        return path
    }

    getNeighbor() {
        let cells = []
        this.scene.cell_group.children.each((cell) => {
            //üste varsa
            if (this.options._x == cell.options._x && (this.options._y - 2 * cell.options.height) == cell.options._y) {
                cells.push(cell)
            }

            //altta varsa
            if (this.options._x == cell.options._x && (this.options._y + 2 * cell.options.height) == cell.options._y) {
                cells.push(cell)
            }

            //solda varsa 
            if (this.options._y == cell.options._y && (this.options._x - 2 * cell.options.width) == cell.options._x) {
                cells.push(cell)
            }

            //sağda varsa 
            if (this.options._y == cell.options._y && (this.options._x + 2 * cell.options.width) == cell.options._x) {
                cells.push(cell)
            }
        })
        return cells
    }

    agMarkAsActive() {
        this.setDepth(this.scene.cell_group.children.size)
        this.clear()
        this.lineStyle(this.options.lineStyle.width, this.options.cell_body_border_next_color, 1.0);
        this.body_circle = new Phaser.Geom.Circle(this.options._x, this.options._y, this.options.height);
        this.strokeCircleShape(this.body_circle);
    }

    createPathCircles() {          
        var path        = new Phaser.Curves.Ellipse(this.options._x, this.options._y, this.options.height) 

        for (let i = 0; i <= 100; i+=3) {  
            let point       = path.getPoint(i / 100)  
            let path_circle = this.scene.add.sprite(point.x, point.y, 'diamond');
            path_circle.scale = 0.2 
            //path_circle.setAlpha(0.8)  
            Phaser.Utils.Array.Add(this.path_circles, path_circle); 
        }
    }

    createParticle(c){
        let particles = this.scene.add.particles('diamond');
        particles.createEmitter({ 
            x: c.x,
            y: c.y, 
            lifespan: 1000,
             
            angle: { min: 0, max: 360 },
            speed: { min: 5, max: 50 },
            scale: { start: 0.5, end: 0.2 },  
            blendMode: 'SCREEN', 
            maxParticles: 1,
        });
        setTimeout(() => {
            particles.destroy()
        }, 2000);
    }

    addCuval(){
        this.treasure           = this.scene.add.sprite(this.options._x, this.options._y, 'treasure',0);
        this.treasure.scale     = 0.3
        this.treasure.setDepth(this.depth-1) 
    }
 
}