class Test extends Phaser.Scene{
    constructor(){
        super('test')
    }
    preload(){

    }
    create(){
       let b = this.add.circle(300, 400, 30, 0xfffff);
       let ball_obj = this.physics.add.existing(b, 0);
       this.ball = ball_obj.body;
       this.ball.setCollideWorldBounds(true);
       this.ball.setBounce(1);
       this.ball.setVelocity(150);
       this.ball.onOverlap = true;

       let p = this.add.rectangle(0, this.game.config.height, 150, 200).setFillStyle(0xFFFFF);
       this.l = this.add.rectangle(75, 25, 120, 35).setFillStyle(0xFFFFFF);
       let player_obj = this.physics.add.existing(p, 0);
       let leg_obj = this.physics.add.existing(this.l, 0);
       this.player = player_obj.body;
       this.player.onOverlap = true;

       this.leg = leg_obj.body;
       this.player.setBounce(0.2);
       this.player.setCollideWorldBounds(true);
       this.leg.setCollideWorldBounds(true);
       this.leg.allowGravity = false;
       this.leg.immovable = true;
       this.leg.onOverlap = true;
       
       this.physics.add.collider(this.ball, this.player);
       this.physics.add.collider(this.ball, this.leg);

       this.cursors = this.input.keyboard.createCursorKeys();
       this.pause = false;
       this.physics.add.overlap(this.ball, this.player);
       this.physics.add.overlap(this.ball, this.leg);

       this.physics.world.on('overlap', () =>{
        this.ball.setVelocityY(this.player.Velocity)
       })
    }
    update(){
        // this.input.keyboard.on('keyup-'+'P', () => {
        //     this.pause = !this.pause;
        //     console.log("changed pause");
        // })
        // // if(this.cursors.p.isDown){
        // //     this.pause = !this.pause;
        // // }
        // if(this.pause){
        //     //game.scene.pause('test');
        //     this.scene.pause('test');
        // }
        // this.scene.launch('test');
        //let cursors = this.input.keyboard.createCursorKeys();
        //const {left, right, spacebar} = this.cursors;
        this.leg.x = this.player.x+155;
        this.leg.y = this.player.y+165;
        let jump_counter = 0;

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

        if(this.cursors.space.isDown){ //&& this.player.touching.down){
            jump_counter++;
            console.log(jump_counter);
            if(jump_counter == 1){
                this.player.setVelocityY(-200);
            }
            if(jump_counter > 1){
                this.player.setVelocityY(-400);
            }

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
    scene: [Test],
    title: "Physics Demo",
    backgroundColor: "0x228b22"
});