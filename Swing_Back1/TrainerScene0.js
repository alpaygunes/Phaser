'use strict'

var configTrainerScene0 = {
    key: 'TrainerScene0'
};

class TrainerScene0 extends IScene {

    table_size      = { rows: 1, columns: 2 }
    directive_count = 0     ;
    player_speed    = 300   ; //ms
    txt_directive           ;
    next_btn                ;
    top_offset      = .10   ;
    
    constructor() {
        super(configTrainerScene0)
    }

 

    create() {   
        this.sound_yut          = this.sound.add('yut');
        this.sound_walk         = this.sound.add('walk', {
            mute: false,
            volume: 0.01,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });
 
        this.events.on('destroy', ()=>{  
            this.sound_walk.stop();
        });

        this.cell_group = this.add.group();
        this.addCells(); 
        this.addEventListenerToCells();
        this.addEventListenerToOwnCells()

        // directifleri göster 

        this.txt_directive  = this.add.text(this.screenCenterX, this.screenCenterY, 'Bir hücreye dokunun', { fill: '#0f0', fontSize: '18px' }).setOrigin(0.5)
        this.next_btn       = this.add.text(this.screenCenterX, this.cameras.main.height*.90, '', { fill: '#0f0', fontSize: '18px' }).setOrigin(0.5)
        this.next_btn.name  = "next_btn" 
        this.next_btn.setInteractive(); 
        this.textGuides();

    }

    addEventListenerToOwnCells() {
        this.input.on('gameobjectdown', (pointer, cell, event) => { 
            if(cell.name == 'next_btn'){
                this.scene.start('PlayScene');
                this.scene.remove('TrainerScene0');
            }
            if (!(cell instanceof ICellSprite)) return;   
            // playeri sahneye ekle
            this.addPlayer(cell)
            this.player.speed = this.player_speed 
            this.textGuides()
        });
    } 

    textGuides(){
        this.txt_directive.text = "";
        if(this.directive_count == 0){
            this.txt_directive.text = "Bir hücreye dokunun";
            this.directive_count ++
        }else if(this.directive_count == 1){ 
            setTimeout(() => { 
                this.txt_directive.text = "Geçiş için diğer hücreye dokunun\n"
                                         +"Yöndeğiştirmek için aynı hücreye dokunun";
                this.txt_directive.setFontSize('12px')
                this.directive_count ++
            }, 1000);
        }else if(this.directive_count == 2){ 
            setTimeout(() => { 
                this.next_btn.text = "SONRAKİ";
                this.directive_count ++
            }, 2000);
        }
    }

}