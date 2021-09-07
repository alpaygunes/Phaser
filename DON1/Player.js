'use strict'

class Player extends Phaser.GameObjects.Graphics {
    options;
    current_cell;
    orbital;
    follower;
    body_circle;
    sensitivity = 0.002;
    speed = 500; //  = 1/ms  
    count = 9999999999999;
    name;
    orbital_path;
    cember_turlama_parcalari = []
    cember_turlama_bitis_indexi = 0; 
    particles;

    constructor(scene, options) {
        super(scene, options);
        this.options = options
        this.name = (Math.random() + 1).toString(36).substring(7);
        // ...
        //scene.add.existing(this);

    }

    agCreate() {
        this.particles = this.scene.add.particles('flares');
        this.particles.createEmitter({
            frame: 'blue',
            x: this.options.x,
            y: this.options.y, 
            lifespan: 100,
            angle: { min: 0, max: 360 },
            speed: { min: 100, max: 200 },
            scale: { start: 0.3, end: 0 }, 
            bounce: 0.1,   
            blendMode: 'ADD'
        });
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };  
        return this;
    }

    preUpdate(time, delta) {
        if(this.scene.game_status == 'stop')return;
        if (this.hareket_yonu == '+') {
            this.count += (1 / this.speed)
        } else {
            this.count -= (1 / this.speed)
        }

        this.follower.t = this.count % 1
        this.orbital_path.getPoint(this.follower.t, this.follower.vec);
        let x = (this.current_cell.x + this.follower.vec.x);
        let y = (this.current_cell.y + this.follower.vec.y);
        this.clear()
        this.body_circle = new Phaser.Geom.Circle(x, y, this.options.height);
        this.fillCircleShape(this.body_circle);
        this.changeCell();
        if (!this.current_cell.turu_tamam){
            this.tarananCemberMiktariniHesapla()
        };
        
        // şimdilik particleyi sahne dışında gösterelim gözükmesin
        this.particles.x = -100 // orjinali  = x
        this.particles.y = -100 // orjinali  = y
    }

    changeCell() {
        //eğer geçiş noktalarına gelmediyse boşuna yorulma çık
        if (!(
            (this.follower.t.toFixed(3) >= (0.00 - this.sensitivity) && this.follower.t.toFixed(3) <= (0.00 + this.sensitivity))
            || (this.follower.t.toFixed(3) >= (0.25 - this.sensitivity) && this.follower.t.toFixed(3) <= (0.25 + this.sensitivity))
            || (this.follower.t.toFixed(3) >= (0.50 - this.sensitivity) && this.follower.t.toFixed(3) <= (0.50 + this.sensitivity))
            || (this.follower.t.toFixed(3) >= (0.75 - this.sensitivity) && this.follower.t.toFixed(3) <= (0.75 + this.sensitivity))
        )) {
            return;
        }
        this.scene.cell_group.children.each(function (c) {
            let cell = c
            // mevcut cell hariç diğerlerini kontrol edelim
            if (cell.id != this.current_cell.id) {
                if (Phaser.Geom.Intersects.CircleToCircle(this.body_circle, cell.body_circle)) {
                    if (cell.markAsNext) {
                        // üsttekine geçiş oluyorsa 
                        if (cell.body_circle.y > this.current_cell.body_circle.y) {
                            this.orbital_path = cell.getOrbitalPath(this.name, 270)
                        }
                        // sağdakine geçiş oluyorsa
                        if (cell.body_circle.x > this.current_cell.body_circle.x) {
                            this.orbital_path = cell.getOrbitalPath(this.name, 180)
                        }
                        // aşağı geçiş oluyorsa
                        if (cell.body_circle.y < this.current_cell.body_circle.y) {
                            this.orbital_path = cell.getOrbitalPath(this.name, 90)
                        }
                        // soldakine geçiş oluyorsa
                        if (cell.body_circle.x < this.current_cell.body_circle.x) {
                            this.orbital_path = cell.getOrbitalPath(this.name, 0)
                        }
 
                        // bir satır sonra önceki olacak. önceki hücreyi pasif olarak işaretleyelim agMarkAsActive olmasın
                        this.current_cell.agUnMarkAsNext();  
                        if(this.current_cell.turu_tamam == false){
                            this.current_cell.txt.text      =  null;
                        }
                        this.current_cell                       = cell
                        this.cember_turlama_parcalari.splice(0, this.cember_turlama_parcalari.length)
                        this.cember_turlama_parcalari.length    = 0
                        this.cember_turlama_bitis_indexi        = 0; 
                        this.count                              = 99999999
                        this.switchMovement();
                        cell.agUnMarkAsNext();
                        cell.agMarkAsActive();
                    }
                }
            }
        }, this);
    }

    // hücre içinde iken iki defa tıklaynınca hareketin yönünü değiştir
    switchMovement() {
        //debugger
        this.hareket_yonu = (this.hareket_yonu == '+') ? '-' : '+'
    }

    tarananCemberMiktariniHesapla() { 
        let index = this.follower.t.toFixed(2) * 100 
        this.current_cell.txt.text = Object.keys(this.cember_turlama_parcalari).length  

        this.cember_turlama_parcalari[index] = this.follower.t.toFixed(2) 
        /*if (Object.keys(this.cember_turlama_parcalari).length == 101) {
            if ((index == this.cember_turlama_bitis_indexi) 
                    || ( index == 100 && this.cember_turlama_bitis_indexi == 0) ) {// başa döndüyse  
                let odul = new Phaser.Geom.Circle(
                    this.current_cell.options._x
                    , this.current_cell.options._y
                    , this.current_cell.options.height / 2);
                this.current_cell.fillStyle(0x123fff);
                this.current_cell.fillCircleShape(odul);
                this.scene.sound_full_cell.play(); 
                this.current_cell.txt.text      = 100; 
                this.current_cell.txt.setDepth(this.current_cell.depth+1)
                this.current_cell.turu_tamam    = true;
            }
        }*/

        if(!this.current_cell.path_circles.length){
            this.scene.sound_full_cell.play();
            this.current_cell.turu_tamam    = true;
        }
    }
     
}