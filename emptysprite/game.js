 
 
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update,
        extend: { 
            halkalariOlustur: halkalariOlustur
        }
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.group       = this.add.group();
}

function create ()
{ 
    this.halkalariOlustur();
}

 

function update ()
{
}


function halkalariOlustur (){
    for (let index = 0; index < 5; index++) { 
        let graphics    = this.add.graphics();
        path            = new Phaser.Curves.Path( ); 
        path.add(new Phaser.Curves.Ellipse( 200*index+100, 100, 100));
        graphics.lineStyle(4, 0xffffff, 6); 
        graphics.fillStyle(0xffff00, 1);
        graphics.fillCircle(200*index+100, 100, 100); 
        graphics.name = index

        var shape   = new Phaser.Geom.Circle(200*index+100, 100, 100);
        graphics.setInteractive(shape,Phaser.Geom.Circle.Contains);
        graphics.on('pointerdown', (obj)=>{
            console.log(graphics) 
            let star = this.group.getChildren().find(v => v.name === graphics.name);
            star.destroy() 
        });
        path.draw(graphics);
        this.group.add(graphics);
    } 
}