'use strict' 

var configPlayScene = {
    key: 'PlayScene'
};

class PlayScene extends IScene {

    table_size      = { rows: 3, columns: 3 } 
    player_speed    = 300   ;//ms 
    enemy_speed     = 300   ;//ms 
    top_offset      = 0     ;
    
    constructor() {
        super(configPlayScene)
    }


    create() { 
        this.sound_yut          = this.sound.add('yut');
        this.sound_loss         = this.sound.add('loss');
        this.sound_full_cell    = this.sound.add('full_cell');
        this.sound_walk         = this.sound.add('walk', {
            mute: false,
            volume: 0.1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });

        this.slide          = null
        this.cell_group     = this.add.group();
        this.enemy_group    = this.add.group();
        this.addCells(); 
        this.addEventListenerToCells();
        this.addEventListenerToOwnCells() ;
        this.add.text(this.screenCenterX, this.screenCenterY, 'Düşmandan uzak durun', { fill: '#0f0', fontSize: '18px' }).setOrigin(0.5);

        this.enemy_count    = 0;
        this.addEnemies();
        this.createSpecificEnemy();
        this.addVagonToCell();
    }

    createSpecificEnemy(){ 
        this.cell_group.children.iterate(cell=>{  
            cell.movement_type = Phaser.Utils.Array.GetRandom(cell.movement_types);    
            let enemy                       = this.addEnemy(cell);
            this.enemy.speed                = this.enemy_speed;
            if(cell.movement_type == 'yoyo'){
                this.enemy.speed            = this.enemy_speed/2; 
            }else if(cell.movement_type == 'circular'){
                this.enemy.speed            = this.enemy_speed; 
            }
            
            this.enemy.hareket_yonu         = (Math.random()>0.5)?'-':'+';
            this.enemy.movement_type        = cell.movement_type;
            this.enemy_group.add(enemy);
        })
    }

    addVagonToCell(){
        this.cell_group.children.iterate(cell=>{   
            cell.addVagon(1);
        })
    } 

    addEnemies(){
        for(let i = 0 ; i<this.enemy_count ; i++){
            setTimeout(() => {
                const cell          = Phaser.Utils. Array.GetRandom(this.cell_group.getChildren())
                const enemy         = this.addEnemy(cell) 
                this.enemy.speed    = this.enemy_speed
                this.enemy.hareket_yonu   = (Math.random()>0.5)?'-':'+'
                this.enemy_group.add(enemy);
            }, (i+1)*1000);
        }
    }

    addEventListenerToOwnCells() {
        this.input.on('gameobjectdown', (pointer, cell, event) => {  
            if (!(cell instanceof ICellSprite)) return;   
            // playeri sahneye ekle
            this.addPlayer(cell)
            this.player.speed = this.player_speed  

        });
    } 





}