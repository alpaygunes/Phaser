class MyText extends Phaser.GameObjects.Text {
    _x;
    _y;
    constructor(scene, x, y, text, style) {
        super(scene, x, y, text, style);
        // ...
        scene.add.existing(this);
        this._x =x;
        this._y =y;
    }
    // ...

    preUpdate(time, delta) {
        if (this.text) {
            this.text = this.text 
            this.x = this._x-this.displayWidth / 2
            this.y = this._y-this.displayHeight / 2
        }
    }
}