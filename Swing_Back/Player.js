'use strict'

class Player extends Circle {
    constructor(scene, options) {
        super(scene, options);
        this.name = 'Player_' + (Math.random() + 1).toString(36).substring(7);
    }

    changeCellIsItPossible() {
        this.scene.cell_group.children.each(function (cell) {
            if (cell.name != this.cell.name) {
                if (Phaser.Geom.Intersects.CircleToCircle(this.center_point, cell.hit_area)) {
                    let intersec_points = Phaser.Geom.Intersects.GetCircleToCircle(this.center_point, cell.hit_area)
                    if (cell.is_next_cell) { 
                        let angle = Math.atan2((intersec_points[0].y - cell.hit_area.y) , (intersec_points[0].x - cell.hit_area.x)) * 180 / Math.PI;
                        this.cell = cell;
                        this.orbital = cell.setOrbitalPath(this.name, angle);
                        this.count = 0;
                        this.switchMovement();
                    }
                }
            }
        }, this)
    }

    preUpdate(time, delta) {

        if (this.hareket_yonu == '+') {
            this.count += (1 / this.speed)
        } else {
            this.count -= (1 / this.speed)
        }

        this.follower.t = this.count % 1
        this.orbital.getPoint(this.follower.t, this.follower.vec);
        this.options.x  = this.follower.vec.x;
        this.options.y  = this.follower.vec.y;

        this.clear()
        this.addHitArea()
        this.addCenterPoint();
        this.changeCellIsItPossible();
    }

}