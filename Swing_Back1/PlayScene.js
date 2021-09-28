'use strict' 

var configPlayScene = {
    key: 'PlayScene'
};

class PlayScene extends IScene {

    table_size      = { rows: 2, columns: 2 } 
    player_speed    = 300   ;//ms 
    enemy_speed     = 300   ;//ms 
    top_offset      = .10   ;
    
    constructor() {
        super(configPlayScene)
    }


    create() { 
        this.slide          = 'up'
        this.cell_group     = this.add.group();
        this.enemy_group    = this.add.group();
        this.addCells(); 
        this.addEventListenerToCells();
        this.addEventListenerToOwnCells() 
        this.add.text(this.screenCenterX, this.screenCenterY, 'Düşmandan uzak durun', { fill: '#0f0', fontSize: '18px' }).setOrigin(0.5)

        this.enemy_count = 3
        this.addEnemies()
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