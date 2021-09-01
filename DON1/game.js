var config = {
    type: Phaser.AUTO,
    width: '100%',
    height: '100%',
    backgroundColor: '0x22181c',
    scene: [MenuScene,PlayScene,SkorScene]
};

var game = new Phaser.Game(config);