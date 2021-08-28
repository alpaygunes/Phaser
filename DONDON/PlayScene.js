'use strict'

var configPlayScene = {
    key: 'PlayScene'
};
class PlayScene extends Phaser.Scene {

    tableSize = { rows: 2, columns: 2 }
    level = 1;
    group;
    player;
    sol_bosluk = 0;
    top_bosluk = 0;

    constructor() {
        super(configPlayScene)
    }

    preload() { }

    create() {
        this.group = this.add.group();
        this.addCells();
        this.addPlayer();
        this.player.currentCell = this.group.getFirstAlive()
    }

    /*update() {
 
     }*/


    // -------------------------------------  create cells 
    addCells() {
        let screen_w = this.sys.game.scale.gameSize.width
        let screen_h = this.sys.game.scale.gameSize.height
        let grup_w = screen_w * .8
        let grup_h = screen_h * .8
        let cell_w,cell_h
        //ekran genişmi yüksek mi ?

        if (screen_h > screen_w) {// dar ekran
            cell_w = Math.floor(grup_w / this.tableSize.columns) 
            cell_h = cell_w 
            grup_h = this.tableSize.rows * cell_w
        } else {
            cell_h = Math.floor(grup_h / this.tableSize.rows) 
            cell_w = cell_h 
            grup_w = this.tableSize.columns * cell_h
        }

        this.sol_bosluk = (screen_w - grup_w) / 2
        this.top_bosluk = (screen_h - grup_h) / 2





        let options = {
            x: 0,
            y: 0,
            _x: 0,
            _y: 0,
            width: cell_w / 2,
            height: cell_h / 2,
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
                row_index++;
                col_index = 0;
            }

            col_index++
            options._x = ((2 * col_index - 1) * options.height) + this.sol_bosluk
            options._y = ((2 * row_index - 1) * options.width) + this.top_bosluk

            let cell = new Cell(this, Object.assign({}, options));
            let cellObj = cell.agCreate()
            // cell e tıklayınca önce hepsi işaretsiz olsun. Sonra sadece tıklanan işaretlensin
            cellObj.on('pointerdown', () => {
                //işaretli olana tekrar tıklanmışsa işareti kaldır
                if (cellObj.markAsNext) {
                    // Eğer iki defa tıklanırsa playerin yönünü değiştir 
                    if (this.player.currentCell == cellObj) {
                        this.player.switchMovement();
                    }
                    cellObj.agUnMarkAsNext()
                    return
                }
                cells.map(cell => { cell.agUnMarkAsNext() })
                cellObj.agMarkAsNext()
                this.player.targetCell = cellObj
            });
            cellObj.id = index
            cells.push(cellObj)
            this.group.add(cellObj);
        }

    }

    // ------------------------------------- Add Player
    addPlayer() {

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

        this.player = new Player(this, options).agCreate()
        // playere e tıklayınca önce hepsi işaretsiz olsun. Sonra sadece tıklanan işaretlensin
        this.player.on('pointerdown', () => {

        });
        this.add.existing(this.player)
        //this.group.add(this.player); 
    }

}