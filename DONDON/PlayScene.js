'use strict'

var configPlayScene = {
    key: 'PlayScene' 
};
class PlayScene extends Phaser.Scene {
    
    tableSize   = {rows:4,columns:4}
    level       = 1;

    constructor() { 
        super(configPlayScene)
    }

    preload() {}

    create() {  
        // create cells  
        let options = {
            x: 0,
            y: 0,
            width:50,
            height:50,
            lineStyle: {
                 width: 2,
                 color: 0xffffff,
                 alpha: 1
             },  
            add: true
        }

        let cell_count = this.tableSize.columns * this.tableSize.rows
        let cells = []
        let container = this.add.container(0, 0);
        let row_index=0,col_index=0
        for (let index = 0; index < cell_count; index++) {  
            if(!(index % this.tableSize.columns)){
                row_index++
                col_index =0
            } 
            col_index++
            options.x   = 2*options.width*col_index
            options.y   = 2*options.height*row_index
            let cell    = new Cell(this,options);
            cells.push(cell.agCreate())
        } 
        
        container.add(cells);   
        // ----------- 
    }

    update() {}  
 
}