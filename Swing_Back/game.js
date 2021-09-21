var config = {
    type: Phaser.CANVAS,
    width: '100%',
    height: '100%',
    backgroundColor: '0x22181c',
    scene: [MenuScene,TrainerScene0,TrainerScene1]
};

var game = new Phaser.Game(config);