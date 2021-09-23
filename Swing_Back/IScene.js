'use strict'

class IScene extends Phaser.Scene {

    table_size;
    player = null;
    cell_group;

    addCells() {

        let left_right_margin = 0.1;
        let top_bottom_margin = 0.1;
        let top_offset = 0.15;
        let screen_w = this.cameras.main.width;
        let screen_h = this.cameras.main.height;
        let grup_w = screen_w * (1 - left_right_margin)
        let grup_h = screen_h * (1 - top_bottom_margin)
        let radius;

        radius = (grup_w / this.table_size.columns)
        if (this.table_size.rows * radius > grup_h) {
            radius = (grup_h / this.table_size.rows)
        }

        let options = {
            x: 0,
            y: 0,
            radius: (radius / 2),
            fillStyle: {
                color: 0x9FB798,
                alpha: 1
            },
            add: true,
        }

        let cell_count = this.table_size.columns * this.table_size.rows
        let row_index = 0
        let col_index = 0
        for (let index = 0; index < cell_count; index++) {
            if (!(index % this.table_size.columns)) {
                row_index++;
                col_index = 0;
            }

            col_index++;
            options.x = ((2 * col_index - 1) * options.radius)
            options.x = parseInt(options.x.toFixed(0)) + (screen_w - (radius * this.table_size.columns)) / 2
            options.y = ((2 * row_index - 1) * options.radius)
            options.y = parseInt(options.y.toFixed(0)) + (screen_h - (radius * this.table_size.rows)) / 2
            options.y += screen_h * top_offset
            let cell = new Cell(this, Object.assign({}, options));
            this.cell_group.add(cell);
        }
    }

    addPlayer(cell) {
        if (this.player == null) {
            let options = {
                x: 0,
                y: 0,
                radius: 10,
                fillStyle: {
                    color: 0xff9999,
                    alpha: 1
                },
                lineStyle: {
                    width: 2,
                    color: 0x003F91,
                    alpha: 1
                },
                add: true,
            }
            this.player = new Player(this, Object.assign({}, options));
            this.player.setDepth(999);
            this.player.cell = cell;
            this.player.orbital = cell.setOrbitalPath(this.player.name, 180);
            this.player.setDepth(999)
            this.add.existing(this.player); 
        }
    }

    addEventListenerToCells() {
        this.input.on('gameobjectdown', (pointer, cell, event) => {
            if (!(cell instanceof Cell)) return;

            // yönü değiştir 
            if (this.player != null && this.player.cell == cell) {
                this.player.switchMovement();
            }

            //sonraki olarak işaretlemeden önce işaretli olanın işaretini kaldır
            if (this.player != null && this.player.cell != cell ) {
                this.events.emit('unmark_all_as_next')
                cell.markAsNext();
            } 
        })
    }

}