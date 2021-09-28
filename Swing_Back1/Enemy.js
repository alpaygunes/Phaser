'use strict'

class Enemy extends IPlayerSprite {

    can_pass = false

    constructor(scene, options) {
        super(scene, options);
        this.name = 'Enemy_' + (Math.random() + 1).toString(36).substring(7);
    }

    changeCellIsItPossible() {
        if (!this.can_pass) return
        this.scene.cell_group.children.each(function (cell) {
            if (cell.name != this.cell.name && cell.visibility) {
                let center_circle = new Phaser.Geom.Circle(this.x, this.y, 1)
                if (Phaser.Geom.Intersects.CircleToRectangle(center_circle, cell.getBounds())) {
                    let intersec_points = Phaser.Geom.Intersects.GetCircleToRectangle(center_circle, cell.getBounds())
                    const rate = Math.random() 
                    if (rate < 0.50 && intersec_points.length) {
                        let angle = Math.atan2((intersec_points[0].y - cell.y), (intersec_points[0].x - cell.x)) * 180 / Math.PI;
                        this.cell = cell;
                        this.orbital = cell.setOrbitalPath(angle);
                        this.count = 0;
                        this.switchMovement();
                        this.can_pass = false
                    }
                }
            }
        }, this)
    }

}