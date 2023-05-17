//let timer;
class Test extends Phaser.Scene{
    constructor(){
        super('test')
    }
    preload(){

    }
    create(){
       // timer = 0;
       this.l1_time = new Phaser.Time.TimerEvent()
       let b = this.add.circle(300, 700, 35, 0xfffff);
       let ball_obj = this.physics.add.existing(b, 0);
       this.ball = ball_obj.body;
       this.ball.setCollideWorldBounds(true);
       this.ball.setBounce(1.05);
       this.ball.setVelocity(250);
       this.ball.onOverlap = true;
       this.ball.onCollide = true;

       let g = this.add.circle(this.game.config.width-200, 250, 150, 0xffffff);
       let g_obj = this.physics.add.existing(g, 0);
       this.goal = g_obj.body;
       this.goal.immovable = true;
       this.goal.allowGravity = false;
       this.goal.onOverlap = true;

       let p = this.add.rectangle(0, this.game.config.height, 150, 200).setFillStyle(0xff0000);
       this.l = this.add.rectangle(210, this.game.config.height+75, 120, 35).setFillStyle(0x000000);
       let player_obj = this.physics.add.existing(p, 0);
       let leg_obj = this.physics.add.existing(this.l, 0);
       this.player = player_obj.body;
       this.player.onOverlap = true;
       this.player.onCollide = true;

       this.leg = leg_obj.body;
       this.player.setBounce(0.2);
       this.player.setCollideWorldBounds(true);
       this.leg.setCollideWorldBounds(true);
       this.leg.allowGravity = false;
       this.leg.immovable = true;
       this.leg.onOverlap = true;
       this.leg.onCollide = true;
       
       this.physics.add.collider(this.ball, this.player);
       this.physics.add.collider(this.ball, this.leg);

       this.cursors = this.input.keyboard.createCursorKeys();
       this.physics.add.overlap(this.ball, this.goal);
    }
    update(){
       // timer++;
        this.physics.world.on('collide', () =>{
            this.ball.setVelocityY(-555);
            this.ball.setBounce(1.1)
        })
        this.physics.world.on('overlap', () =>{
            this.scene.start('l1_done', this.l1_time.getElapsedSeconds());
        })
        
        this.leg.y = this.player.y+165;

        if(this.cursors.left.isDown){
           this.player.setVelocityX(-400);
           this.leg.x = this.player.x-125;
        }
        else if(this.cursors.right.isDown){
            this.player.setVelocityX(400);
            this.leg.x = this.player.x+155;
        }
        else{
            this.player.setVelocityX(0);
        }

        if(this.cursors.space.isDown && this.player.onFloor()){
          this.player.setVelocityY(-400);
        } 
        this.input.keyboard.on('keydown-'+'R',()=>{
            this.scene.start('test');
        })
        
    }
}


class Level1_Done extends Phaser.Scene{
    constructor(){
        super('l1_done')
    }
    preload(){

    }
    //figure out this business
    init(data){
        console.log('init', data);
        this.seconds = data;
    }
    create(){
        this.add.text(150, 300, "Time: "+ this.seconds + " seconds");
        this.g = this.add.circle(this.game.config.width-200, this.game.config.height-200, 50, 0x000000);
        this.b = this.add.circle(300, this.game.config.height-200, 30, 0xfffff);
        
        this.b.setInteractive({draggable: true});
        //code below taken from https://labs.phaser.io/edit.html?src=src/input/dragging/drag%20horizontally.js
        //~~~~~~~~
        this.input.on('drag', (pointer, gameObject, dragX) => {

            //  By clamping dragX we can keep it within
            //  whatever bounds we need
            dragX = Phaser.Math.Clamp(dragX, 100, this.game.config.width-200);

            //  By only applying the dragX we can limit the drag
            //  to be horizontal only
            gameObject.x = dragX;

        });
        //~~~~~~~~~


    }

    update(){
        if(this.b.x == this.g.x){
            this.scene.start('test');
        }
    }

}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    physics:{
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
             //    x: 0,
                 y: 300
             }
        }
    },
    scene: [Test, Level1_Done],
    title: "Physics Demo",
    backgroundColor: "0x228b22"
});