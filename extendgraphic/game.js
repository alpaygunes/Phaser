 
 
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update, 
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.group       = this.add.group();
}

function create ()
{ 
    let options ={
        x: 0,
        y: 0,
    
        lineStyle: {
             width: 1,
             color: 0xffffff,
             alpha: 1
         },  
        add: true
    }
    for (let index = 0; index < 5; index++) {  
        options.x = (100*index)
        var graphics = new Halka(this,options);
        this.add.existing(graphics.getHalka())
    } 
}

 

function update ()
{
}


 