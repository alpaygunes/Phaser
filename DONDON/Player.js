'use strict'

class Player extends Phaser.GameObjects.Graphics {
    options;
    targetCell;
    orbital;
    tweens;
    follower;
    circle;
    constructor(scene, options) {
        super(scene, options);
        this.options = options
        // ...
        //scene.add.existing(this);
    }

    agCreate() {
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.scene.tweens.add({
            targets: this.follower,
            t: 1,
            ease: 'Linear',
            duration: 10000,
            repeat: -1
        });

        let path = new Phaser.Curves.Path();
        path.add(new Phaser.Curves.Ellipse(0, 0, this.options.height));
        path.draw(this);

        this.circle = new Phaser.Geom.Circle(0, 0, this.options.height);
        this.setInteractive(this.circle, Phaser.Geom.Circle.Contains);
        return this;
    }



    preUpdate(time, delta) {
        this.orbital = this.targetCell.orbital;
        this.orbital.getPoint(this.follower.t, this.follower.vec);
        this.setX(this.targetCell.x + this.follower.vec.x);
        this.setY(this.targetCell.y + this.follower.vec.y);
        this.changeCell();
    }

    changeCell() {
        let BU = this
        console.log(Phaser.Geom.Intersects.CircleToCircle(this.circle, this.scene.container.getAt(15).circle))
        this.scene.container.each(function (child) {
            /*if (child.id != BU.targetCell.id) {
                console.log(Phaser.Geom.Intersects.CircleToCircle(BU.circle, child.circle))
            }*/
        });
        if (this.follower.t.toFixed(2) == 0.00) {
        } else if (this.follower.t.toFixed(2) == 0.25) {
        } else if (this.follower.t.toFixed(2) == 0.50) {
        } else if (this.follower.t.toFixed(2) == 0.75) {
        } else if (this.follower.t.toFixed(2) == 1.00) {
        }
    }
}