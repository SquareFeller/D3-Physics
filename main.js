class Test extends Phaser.Scene{
    constructor(){
        super('test')
    }
    preload(){

    }
    create(){
       let b = this.add.circle(300, 400, 30, 0xfffff);
       let ball_obj = this.physics.add.existing(b, 0);
       let ball = ball_obj.body;
       //ball.setCollideWorldBounds(true);
       ball.enable = true;
       //ball.setCollideWorldBounds();
       ball.setCollideWorldBounds(true);
       ball.setBounce(1);
       ball.setVelocity(150);
       

       let p = this.add.rectangle(350, 450, 150, 200).setFillStyle(0xFFFFF);
       let player_obj = this.physics.add.existing(p, 0);
       let player = player_obj.body;
       player.enable = true;
       player.setCollideWorldBounds(true);
       
       this.physics.add.collider(ball, player);

       let cursorKeys = this.input.keyboard.createCursorKeys();
        
    }
    update(){
        let cursorKeys = this.input.keyboard.createCursorKeys();
        if(cursorKeys.left.isDown){
            player.x -= 15;
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
                 y: 100
             }
        }
    },
    scene: [Test],
    title: "Physics Demo",
});