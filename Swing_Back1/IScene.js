'use strict'

class IScene extends Phaser.Scene {

    table_size;
    player = null;
    enemy_group;
    enemy_count = 1;
    cell_group;
    top_offset;
    screenCenterX;
    screenCenterY;
    slide = null; // up down left right
    sound_loss;
    sound_full_cell;
    sound_walk;


    Initial() {
        this.screenCenterX = this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.height / 5;
    }

    preload() {
        this.Initial();
        this.load.image('circle', 'assets/images/circle.png');
        this.load.image('enemy', 'assets/images/enemy.png');
        this.load.image('player', 'assets/images/player.png');
        this.load.image('diamond', 'assets/images/diamond.png');
        this.load.image('vagon', 'assets/images/player.png');
        this.load.image('tail', 'assets/images/player.png');

        this.load.audio('loss', 'assets/audio/loss.mp3');
        this.load.audio('full_cell', 'assets/audio/full_cell.mp3');
        this.load.audio('walk', 'assets/audio/walk.mp3');
        this.load.audio('yut', 'assets/audio/yut.mp3');
    }

    addCells() {

        let left_right_margin = 0.01;
        let top_bottom_margin = 0.01;
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
            options.y += screen_h * this.top_offset
            let options_ = Object.assign({}, options)
            let cell = new ICellSprite({ scene: this, texture: 'circle', options: options_ });
            cell.setInteractive()
            cell.id = index
            this.add.existing(cell);
            this.cell_group.add(cell);
        }
    }

    addPlayer(cell) {
        if (this.player == null) {
            let options = {
                x: 0,
                y: 0,
                radius: 5,
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
            let options_ = Object.assign({}, options)
            this.player = new Player({ scene: this, texture: 'player', options: options_ });
            this.player.setDepth(999);
            this.player.cell = cell;
            this.player.orbital = cell.setOrbitalPath(180);
            this.player.setDepth(999)
            this.add.existing(this.player);
        }
    }

    addEnemy(cell) {
        let options = {
            x: 0,
            y: 0,
            radius: 5,
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
        let options_ = Object.assign({}, options);
        this.enemy = new Enemy({ scene: this, texture: 'enemy', options: options_ });
        this.enemy.setDepth(999);
        this.enemy.cell = cell;
        this.enemy.orbital = cell.setOrbitalPath(-90);
        this.enemy.setDepth(999);
        this.add.existing(this.enemy);
        return this.enemy;

    }
 
    addEventListenerToCells() {
        this.input.on('gameobjectdown', (pointer, cell, event) => {
            if (!(cell instanceof ICellSprite)) return;
            // yönü değiştir 
            if (this.player != null && this.player.cell == cell) {
                this.player.switchMovement();
            }

            //sonraki olarak işaretlemeden önce işaretli olanın işaretini kaldır
            if (this.player != null && this.player.cell != cell) {
                this.events.emit('unmark_all_as_next')
                cell.markAsNext();
            }
        })
    }


}