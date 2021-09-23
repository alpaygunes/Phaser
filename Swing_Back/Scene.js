'use strict'

var configScene = {
    key: 'Scene'
};

class Scene extends Phaser.Scene {

    table_size      = { rows: 2, columns: 2 }
    txt_directive   = null;
    player          = null;
    cell_group      ;
    

    constructor() {
        super(configScene)
    }
 

    create() {
        this.cell_group         = this.add.group();
        this.addCells()
        this.addTextToushToStart()
    }

    addCells() {

        let left_right_margin   = 0.1;
        let top_bottom_margin   = 0.1;
        let top_offset          = 0.15;
        let screen_w            = this.cameras.main.width;
        let screen_h            = this.cameras.main.height;
        let grup_w              = screen_w * (1-left_right_margin)
        let grup_h              = screen_h * (1-top_bottom_margin)
        let radius;
 
        radius                  = (grup_w / this.table_size.columns) 
        if (this.table_size.rows * radius > grup_h) { 
            radius              = (grup_h / this.table_size.rows)
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

        let cell_count  = this.table_size.columns * this.table_size.rows
        let row_index   = 0
        let col_index   = 0
        for (let index  = 0; index < cell_count; index++) {
            if (!(index % this.table_size.columns)) {
                row_index++;
                col_index = 0;
            }

            col_index++;
            options.x   = ((2 * col_index - 1) * options.radius)
            options.x   = parseInt(options.x.toFixed(0))          + (screen_w-(radius*this.table_size.columns))/2
            options.y   = ((2 * row_index - 1) * options.radius)  
            options.y   = parseInt(options.y.toFixed(0))        +  (screen_h-(radius*this.table_size.rows))/2
            options.y   +=  screen_h*top_offset

            let cell    = new Cell(this, Object.assign({}, options)); 
            this.cell_group.add(cell);
            cell.on('pointerdown', () => {
                // yönerge
                this.txt_directive.text = ""
                setTimeout(() => {
                    this.txt_directive.text = "Komşu hücreye tıklayın"
                }, 2000);

                // playeri sahneye ekle
                if(this.player == null){
                    this.addPlayer();
                    this.player.cell    = cell;
                    this.player.orbital = cell.setOrbitalPath(this.player.name, 180);
                    this.player.setDepth(999)
                }

                // yönü değiştir işaretlemeden çık
                if (this.player.cell == cell) {
                    this.player.switchMovement();
                }

                //sonraki olarak işaretlemeden önce işaretli olanın işaretini kaldır
                this.events.emit('unmark_all_as_next')
                cell.markAsNext();
            })
        }
    }

    addTextToushToStart(){
        const screenCenterX = this.cameras.main.width  / 2;
        const screenCenterY = this.cameras.main.height / 5; 
        this.txt_directive  = this.add.text(screenCenterX, screenCenterY,   'Bir hücreye dokunun', { fill: '#0f0',fontSize: '18px'}).setOrigin(0.5)
        this.txt_directive.setInteractive(); 
    }

    addPlayer(){
        let options = {
            x: 0,
            y: 0,
            radius:10,
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
        this.player.setDepth(999)
        this.add.existing(this.player)
    }

}