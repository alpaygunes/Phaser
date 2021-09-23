'use strict'

var configTrainerScene1 = {
    key: 'TrainerScene1'
};

class TrainerScene1 extends Phaser.Scene {

    table_size = { rows: 2, columns: 2 }
    txt_directive;

    constructor() {
        super(configTrainerScene1)
    }

    preload() { }

    create() {
        this.addCells() 
    }

    addCells() {

        let left_right_margin  = 0.1;
        let top_bottom_margin  = 0.1;
        let top_offset         = 0.15;
        let screen_w = this.cameras.main.width;
        let screen_h = this.cameras.main.height;
        let grup_w = screen_w * (1-left_right_margin)
        let grup_h = screen_h * (1-top_bottom_margin)
        let radius;
 
        radius = (grup_w / this.table_size.columns)

        if (this.table_size.rows * radius > grup_h) { 
            radius = (grup_h / this.table_size.rows)
        }
 
        let options = {
            x: 0,
            y: 0,
            radius:(radius / 2),
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
            options.x = parseInt(options.x.toFixed(0))          + (screen_w-(radius*this.table_size.columns))/2
            options.y = ((2 * row_index - 1) * options.radius)  
             
            options.y   = parseInt(options.y.toFixed(0))        +  (screen_h-(radius*this.table_size.rows))/2
            options.y   +=  screen_h*top_offset

            let cell = new Cell(this, Object.assign({}, options));
            cell.on('pointerdown', () => { 
            })
        }
    } 

}