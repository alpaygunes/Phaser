'use strict'

var configMenuScene = {
    key: 'MenuScene' 
};
class MenuScene extends Phaser.Scene {
    constructor() { 
        super(configMenuScene)
    }

    preload() {}

    create() {  
        const helloButton = this.add.text(100, 100, 'Hello Phaser!', { fill: '#0f0' });
        helloButton.setInteractive();
        helloButton.on('pointerover', () => { 
            helloButton.setStyle({ fill: '#ff0'});
         });
        helloButton.on('pointerdown', () =>{
            this.scene.start('PlayScene')
        })
     }

    update() {} 
    
}