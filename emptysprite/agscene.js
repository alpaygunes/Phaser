class AgScene extends Phaser.Scene {
    constructor() { 
        super('AgScene')
    }

    preload() {
    }

    create() {
        debugger
        group       = this.add.group();
        for (let index = 0; index < 5; index++) { 
    
            let graphics    = this.add.graphics();
            let path        = new Phaser.Curves.Path( 0, 0); 
            path.add(new Phaser.Curves.Ellipse( 200*index, 0, 100));
            graphics.lineStyle(4, 0xffffff, 6);
            path.draw(graphics);
            group.add(graphics);
        }    
        group.children.iterate(function (alien,index) {  
            setTimeout(() => {
                group.killAndHide(alien); 
            }, 1000*index);
        });
    }

    update() {
    }

}