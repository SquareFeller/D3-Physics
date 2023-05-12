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
       //ball.setCollideWorldBounds(true);
       this.ball.enable = true;
       //ball.setCollideWorldBounds();
       this.ball.setCollideWorldBounds(true);
       this.ball.setBounce(1);
       this.ball.setVelocity(150);


       let p = this.add.container(350, this.game.config.height - 300);
       p.add(this.add.rectangle(350, this.game.config.height, 150, 200).setFillStyle(0xFFFFF));
       let leg = this.add.rectangle(400, this.game.config.height - 70, 70, 70).setFillStyle(0xFFFFFF);
       p.add(leg);
       let player_obj = this.physics.add.existing(p, 0);
       this.player = player_obj.body;
       //player.setMaxVelocity
       this.player.enable = true;
       this.player.setCollideWorldBounds(true);
       
       this.physics.add.collider(this.ball, this.player);

       this.cursors = this.input.keyboard.createCursorKeys();
       this.pause = false;
        
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
        if(this.cursors.left.isDown){
           this.player.setVelocityX(-400);
            //this.player.setFlip(true, false);
        }
        else if(this.cursors.right.isDown){
            this.player.setVelocityX(400);
        }

        if(this.cursors.space.isDown){ //&& this.player.touching.down){
            this.player.setVelocityY(-400);
        }
        
    }
    kick(){
        //code here that affects the leg where we raise the angle of the leg by a small amount
        //(like a kick) and then reset the angle soon after
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
});