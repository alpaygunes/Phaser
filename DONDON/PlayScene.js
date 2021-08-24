'use strict'

var configPlayScene = {
    key: 'PlayScene'
};
class PlayScene extends Phaser.Scene {

    tableSize   = { rows: 4, columns: 4 }
    level       = 1;
    container;
    player; 

    constructor() {
        super(configPlayScene)
    }

    preload() { }

    create() { 
        this.container = this.add.container(0, 0);
        this.addCells();
        this.addPlayer();       
        this.player.targetCell     = this.container.getAt(1) 
    }

    update() { 
        
    }


    // -------------------------------------  create cells 
    addCells() { 
        let options = {
            x: 0,
            y: 0,
            width: 50,
            height: 50,
            lineStyle: {
                width: 2,
                color: 0xffffff,
                alpha: 1
            },
            add: true
        }

        let cell_count = this.tableSize.columns * this.tableSize.rows
        let cells = []
        let row_index = 0, col_index = 0
        for (let index = 0; index < cell_count; index++) {
            if (!(index % this.tableSize.columns)) {
                row_index++
                col_index = 0
            }
            col_index++
            options.x = 2 * options.width * col_index
            options.y = 2 * options.height * row_index
            let cell = new Cell(this, options);
            let cellObj = cell.agCreate()
            // cell e tıklayınca önce hepsi işaretsiz olsun. Sonra sadece tıklanan işaretlensin
            cellObj.on('pointerdown', () => {
                //işaretli olana tekrar tıklanmışsa işareti kaldır
                if(cellObj.markAsNext){
                    cellObj.agUnMarkAsNext()
                    return
                }
                cells.map(cell => {
                    cell.agUnMarkAsNext()
                })
                cellObj.agMarkAsNext()
                this.player.targetCell     = cellObj 
            });

            cellObj.id = index
            cells.push(cellObj)
        } 
        this.container.add(cells); 
    }

    // ------------------------------------- Add Player
    addPlayer(){

        let options = {
            x: 0,
            y: 0,
            width: 10,
            height: 10,
            lineStyle: {
                width: 2,
                color: 0xff0000,
                alpha: 1
            },
            add: true
        }
 
        this.player   = new Player(this, options).agCreate()
        // playere e tıklayınca önce hepsi işaretsiz olsun. Sonra sadece tıklanan işaretlensin
        this.player.on('pointerdown', () => {
             
        });
        this.add.existing(this.player)
        //this.container.add(this.player); 
    }

}