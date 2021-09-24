'use strict'

var configTrainerScene0 = {
    key: 'TrainerScene0'
};

class TrainerScene0 extends IScene {

    table_size = { rows: 10, columns: 5 }
    directive_count = 0;
    player_speed = 300;//ms
    constructor() {
        super(configTrainerScene0)
    }

    create() {
        this.cell_group = this.add.group();
        this.addCells();
        this.addDirectiveTexts();
        this.addEventListenerToCells();
        this.addEventListenerToOwnCells()
    }

    addEventListenerToOwnCells() {
        this.input.on('gameobjectdown', (pointer, cell, event) => { 
            if (!(cell instanceof Cell)) return;
            this.txt_directive.text = "";
            
            if (this.directive_count == 0) {
                setTimeout(() => {
                    this.txt_directive.text = "Komşu hücreye tıklayın"; 
                    this.directive_count++;  
                }, 3000);
            } else if (this.directive_count == 1) {
                setTimeout(() => {
                    this.txt_directive.text = "Aynı hücreye tıklayın";
                    this.directive_count++; 
                }, 2000);
            } else if (this.directive_count == 2) {
                setTimeout(() => {
                    this.txt_directive.text = "Bütün ödülleri toplayın";
                    this.directive_count++; 
                }, 1000);
            } else if (this.directive_count == 3) {
                setTimeout(() => {
                    this.txt_directive.text = "Şimdi düşmana yakalanmadan gezinin";
                    this.directive_count++;
                }, 1000);
            }

            // playeri sahneye ekle
            this.addPlayer(cell)
            this.player.speed = this.player_speed
        });
    }

    addDirectiveTexts() {
        const screenCenterX = this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.height / 5;
        this.txt_directive  = this.add.text(screenCenterX, screenCenterY, 'Bir hücreye dokunun', { fill: '#0f0', fontSize: '18px' }).setOrigin(0.5)
        this.txt_directive.setInteractive();
    }

}