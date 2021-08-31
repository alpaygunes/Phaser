'use strict'

class Cell extends Phaser.GameObjects.Graphics {

    options;
    markAsNext = false;
    body_circle;
    orbital;
    hit_area_shape;

    constructor(scene, options) {
        super(scene, options);
        this.options = options
        this.name = (Math.random() + 1).toString(36).substring(7);
        // ...
        scene.add.existing(this);
    }

    agCreate() {
        this.orbital = new Phaser.Curves.Path();

        this.body_circle = new Phaser.Geom.Circle(this.options._x, this.options._y, this.options.height);
        this.fillCircleShape(this.body_circle);

        this.hit_area_shape = new Phaser.Geom.Circle(this.options._x, this.options._y, this.options.height);
        this.setInteractive(this.hit_area_shape, Phaser.Geom.Circle.Contains);
        return this;
    }

    agMarkAsNext() {
        this.markAsNext = !this.markAsNext
        this.clear()
        this.fillStyle(0x123456);
        this.body_circle = new Phaser.Geom.Circle(this.options._x, this.options._y, this.options.height);
        this.fillCircleShape(this.body_circle);
        this.fillStyle(this.options.fillStyle.color);
    }

    agUnMarkAsNext() {
        this.markAsNext = false
        this.clear()
        this.body_circle = new Phaser.Geom.Circle(this.options._x, this.options._y, this.options.height);
        this.fillCircleShape(this.body_circle);
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
            if (this.options._x == cell.options._x && (this.options._y - 2*cell.options.height) == cell.options._y) {
                cells.push(cell)
            }

            //altta varsa
            if (this.options._x == cell.options._x && (this.options._y + 2*cell.options.height) == cell.options._y) {
                cells.push(cell)
            }

            //solda varsa 
            if (this.options._y == cell.options._y && (this.options._x - 2*cell.options.width) == cell.options._x) {
                cells.push(cell)
            }

            //sağda varsa 
            if (this.options._y == cell.options._y && (this.options._x + 2*cell.options.width) == cell.options._x) {
                cells.push(cell)
            }
        })
        return cells
    }

    /*preUpdate(time, delta) {  
        debugger
    }*/
}