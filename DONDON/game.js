var config = {
    type: Phaser.AUTO,
    width: '100%',
    height: '100%',
    scene: [MenuScene,PlayScene,SkorScene]
};

var game = new Phaser.Game(config);