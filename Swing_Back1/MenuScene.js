'use strict'

var configMenuScene = {
    key: 'MenuScene'
};
class MenuScene extends Phaser.Scene {
    constructor() {
        super(configMenuScene)
    }

    preload() {
        
    }

    create() {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width  / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2; 

        const logo = this.add.text(screenCenterX, 200,          'Swing Back',    { fill: '#0f0',fontSize: '24px' }).setOrigin(0.5)
        const helloButton = this.add.text(screenCenterX, 250,   'Hello Phaser!', { fill: '#0f0',fontSize: '24px'}).setOrigin(0.5)
        helloButton.setInteractive();
        helloButton.on('pointerover', () => {
            helloButton.setStyle({ fill: '#ff0' });
        });
        helloButton.on('pointerdown', () => {
            this.scene.start('TrainerScene0')
        })
    }

    update() {}

}