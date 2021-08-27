'use strict'

var configPlayScene = {
    key: 'PlayScene'
};
class PlayScene extends Phaser.Scene {

    tableSize = { rows: 5, columns: 6 }
    level = 1;
    group;
    player;

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

    update() {

    }


    // -------------------------------------  create cells 
    addCells() {
        let options = {
            x: 0,
            y: 0,
            _x: 0,
            _y: 0,
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
                row_index++;
                col_index = 0;
            }

            col_index++
            options._x = (2 * col_index - 1) * options.height
            options._y = (2 * row_index - 1) * options.width

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