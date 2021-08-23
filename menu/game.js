var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [MenuScene,PlayScene,SkorScene]
};

var game = new Phaser.Game(config);
