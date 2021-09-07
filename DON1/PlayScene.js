'use strict'

var configPlayScene = {
    key: 'PlayScene',
};
class PlayScene extends Phaser.Scene {

    table_size = { rows: 4, columns: 3 }
    target_cell;
    level = 1;
    cell_group;
    enemy_group;
    player;
    sol_bosluk = 0;
    top_bosluk = 0;
    game_status = 'stop'; // play | stop
    firstClickTime = 0
    enemies = [];
    enemy_count = 1
    flares;
    sound_loss;
    sound_full_cell;
    sound_walk;
    cell_body_border_size = 1
    cell_body_border_color = '0x047b7c'
    cell_body_border_next_color = '0xb57fff'

    constructor() {
        super(configPlayScene)
    }

    preload() {
        this.load.atlas('flares', 'assets/flares.png', 'assets/flares.json');
        this.load.audio('loss', 'assets/audio/loss.mp3');
        this.load.audio('full_cell', 'assets/audio/full_cell.mp3');
        this.load.audio('walk', 'assets/audio/walk.mp3');
        this.load.image('circle', 'assets/circle.png');

    }

    create() {
        this.sound_loss = this.sound.add('loss');
        this.sound_full_cell = this.sound.add('full_cell');
        this.sound_walk = this.sound.add('walk', {
            mute: false,
            volume: 0.01,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });

        this.cell_group = this.add.group();
        this.enemy_group = this.add.group();
        this.addCells();
        this.addEnemies();
    }

    update() {
        // ------------------------------------------ player enemyye temeas ettimi ?
        if (this.game_status == 'play') {
            this.enemy_group.children.each(function (enemy) {
                if (enemy.current_cell === this.player.current_cell) {
                    if (Phaser.Geom.Intersects.CircleToCircle(enemy.body_circle, this.player.body_circle)) {
                        console.log("-----  TEMAS  ---")
                        this.game_status = 'stop'
                        this.sound_loss.play();
                        this.sound_walk.stop();
                    }
                }
            }.bind(this))
        } // ----- end if   

        // hücrenin path_circles circle sine değise destrol et circle
        if (this.game_status == 'play') {
            Phaser.Utils.Array.Each(this.player.current_cell.path_circles,(c)=>{
                let bounds = c.getBounds()
                if (Phaser.Geom.Intersects.CircleToRectangle(this.player.body_circle,bounds)) {
                    Phaser.Utils.Array.Remove(this.player.current_cell.path_circles,c)
                    c.destroy()
                }
            })
        }
    }// -------------------------------------------- END UPDATE





    //------------ add enemy
    addEnemies() {
        let options = {
            x: 0,
            y: 0,
            width: 5,
            height: 5,
            lineStyle: {
                width: 2,
                color: 0xff0000,
                alpha: 1
            },
            fillStyle: {
                color: 0xff0000,
                alpha: 1
            },
            add: true
        }

        for (let index = 0; index < this.enemy_count; index++) {
            setTimeout(() => {
                let random_cell = Math.floor(Math.random() * this.cell_group.getChildren().length)
                let enemy = new Enemy(this, options).agCreate()
                let cell = this.cell_group.getChildren()[random_cell]
                enemy.orbital_path = cell.getOrbitalPath(enemy.name, 180)
                enemy.current_cell = cell
                enemy.setDepth((999 - index))
                this.add.existing(enemy)
                this.enemy_group.add(enemy);
            }, Math.random() * 200 * this.enemy_count);
        }


    } // ---- end add enemy

    // game start
    startPlay() {
        this.resetAll();
        if (!this.player) {
            this.addPlayer();
        }
        this.player.orbital_path = this.target_cell.getOrbitalPath(this.player.name, 180)
        this.player.current_cell = this.target_cell
        this.target_cell.agMarkAsActive();
        this.sound_walk.play();
    }

    // -------------------------------------  create cells 
    addCells() {
        let screen_w = this.sys.game.scale.gameSize.width
        let screen_h = this.sys.game.scale.gameSize.height
        let grup_w = screen_w * .8
        let grup_h = screen_h * .8
        let cell_w, cell_h
        //ekran genişmi yüksek mi ?

        if (screen_h > screen_w) {// dar ekran
            cell_w = Math.floor(grup_w / this.table_size.columns)
            cell_h = cell_w
            grup_h = this.table_size.rows * cell_w
        } else {
            cell_h = Math.floor(grup_h / this.table_size.rows)
            cell_w = cell_h
            grup_w = this.table_size.columns * cell_h
        }

        this.sol_bosluk = ((screen_w - grup_w) / 2)
        this.top_bosluk = ((screen_h - grup_h) / 2)

        let options = {
            x: 0,
            y: 0,
            _x: 0,
            _y: 0,
            width: parseInt(cell_w.toFixed(0)) / 2,
            height: parseInt(cell_h.toFixed(0)) / 2,
            lineStyle: {
                width: this.cell_body_border_size,
                color: this.cell_body_border_color,
                alpha: 1
            },
            fillStyle: {
                color: 0x9FB798,
                alpha: 1
            },
            add: true,
            cell_body_border_next_color: this.cell_body_border_next_color
        }

        let cell_count = this.table_size.columns * this.table_size.rows
        let cells = []
        let row_index = 0, col_index = 0
        for (let index = 0; index < cell_count; index++) {
            if (!(index % this.table_size.columns)) {
                row_index++;
                col_index = 0;
            }

            col_index++;
            options._x = ((2 * col_index - 1) * options.height) + this.sol_bosluk
            options._x = parseInt(options._x.toFixed(0))
            options._y = ((2 * row_index - 1) * options.width) + this.top_bosluk
            options._y = parseInt(options._y.toFixed(0))

            let cell = new Cell(this, Object.assign({}, options));
            let cellObj = cell.agCreate()

            // cell e tıklayınca önce hepsi işaretsiz olsun. Sonra sadece tıklanan işaretlensin
            cellObj.on('pointerdown', () => {
                // herhangi bir hücreye tıklayınca başl
                if (this.game_status == 'stop') {
                    this.game_status = 'play'
                    this.target_cell = cellObj
                    this.startPlay();
                }

                // yönü değiştir işaretlemeden çık
                if (this.player.current_cell == cellObj) {
                    this.player.switchMovement();
                    this.player.cember_turlama_bitis_indexi = this.player.follower.t.toFixed(2) * 100
                    return
                }

                //işaretli olana tekrar tıklanmışsa işareti kaldır
                if (cellObj.markAsNext) {
                    cellObj.agUnMarkAsNext()
                    return
                }
                cells.map(cell => {
                    if (this.player?.current_cell !== cell) {
                        cell.agUnMarkAsNext()
                    }
                })
                cellObj.agMarkAsNext()
                this.player.target_cell = cellObj

            });
            cellObj.id = index
            cells.push(cellObj)
            this.cell_group.add(cellObj);
        }

    }

    // -------------------------------------  Add Player
    addPlayer() {
        let options = {
            x: 0,
            y: 0,
            width: 5,
            height: 5,
            lineStyle: {
                width: 2,
                color: 0x003F91,
                alpha: 1
            },
            fillStyle: {
                color: 0x003F91,
                alpha: 1
            },
            add: true
        }

        this.player = new Player(this, options).agCreate()
        this.player.setDepth(999)
        this.add.existing(this.player)
        //this.cell_group.add(this.player); 
    }

    //-------------------------------------   resetAll
    resetAll() {
        if (this.player) {
            this.player.cember_turlama_parcalari.splice(0, this.player.cember_turlama_parcalari.length)
            this.player.cember_turlama_parcalari.length = 0
            this.player.cember_turlama_bitis_indexi = 0;
            this.player.cember_turu_tamam = false;
        }

        this.cell_group.children.each((cell) => {
            if (!cell.turu_tamam) {
                cell.txt.text = null
            }
        })
    }
}