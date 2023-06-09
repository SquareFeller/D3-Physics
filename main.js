class Level1 extends Phaser.Scene {
    constructor() {
        super('l1')
    }
    preload() {

    }
    //strategy of keeping track of seconds and code was provided to me by my classmate and friend Nathaniel Chu
    init(data){
        this.seconds = data.seconds || 0;
    }
    create() {
        this.time.addEvent({
            delay: 100,
            loop: true,
            callback: () => {
                this.seconds+=0.1;
            }
        });
        this.cameras.main.setBackgroundColor('#228b22');
        let b = this.add.circle(300, 775, 35, 0xfffff);
        let ball_obj = this.physics.add.existing(b, 0);
        this.ball = ball_obj.body;
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1.05);
        this.ball.setVelocity(250);
        this.ball.onOverlap = true;
        this.ball.onCollide = true;

        let g = this.add.circle(this.game.config.width - 200, 225, 125, 0xffffff);
        let g_obj = this.physics.add.existing(g, 0);
        this.goal = g_obj.body;
        this.goal.immovable = true;
        this.goal.allowGravity = false;
        this.goal.onOverlap = true;

        let p = this.add.rectangle(0, this.game.config.height, 150, 200).setFillStyle(0xff0000);
        this.l = this.add.rectangle(210, this.game.config.height + 75, 120, 35).setFillStyle(0x000000);
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

        this.physics.add.collider(
            this.ball,
            this.player,
            null,
            (ball, player) => {
                if (this.ball.y <= this.player.y || this.ball.y <= this.leg.y) {
                    this.touches++;
                }
            }
        );

        this.physics.add.collider(
            this.ball,
            this.leg,
            null,
            (ball, leg) => {
                if (this.ball.y <= this.leg.y) {
                    this.touches++;
                }
            });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.overlap(this.ball, this.goal);
        this.touches = 0;
    }
    update() {
        this.physics.world.on('collide', () => {
            this.ball.setVelocityY(-555);
            this.ball.setBounce(1.06)
        })
        this.physics.world.on('overlap', () => {
            this.scene.start('l1_done', { touches: this.touches, seconds: this.seconds });
        })

        this.leg.y = this.player.y + 165;

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-400);
            this.leg.x = this.player.x - 125;
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(400);
            this.leg.x = this.player.x + 155;
        }
        else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.space.isDown && this.player.onFloor()) {
            this.player.setVelocityY(-250);
        }
        this.input.keyboard.on('keydown-' + 'R', () => {
            this.scene.start('l1');
        })

    }
}

//END OF LEVEL 1
class Level1_Done extends Phaser.Scene {
    constructor() {
        super('l1_done')
    }
    preload() {

    }
    init(data) {
        this.touches = data.touches;
        this.seconds = data.seconds;
    }
    create() {
        this.cameras.main.setBackgroundColor('#228b22');
        this.add.text(300, 400, "Time: " + this.seconds).setFontSize(35);
        this.add.text(this.game.config.width / 3, 200, "LEVEL 1 COMPLETED!").setFontSize(65);
        this.add.text(300, 300, "You’re doing great, kid! A recruiter even noticed your skills. Show them what you got!!").setWordWrapWidth(1500).setFontSize(45);
        this.add.text(300, 1000, "[Slide the ball to the right to keep going!]").setFontSize(35)
        this.g = this.add.circle(this.game.config.width - 200, this.game.config.height - 200, 50, 0x000000);
        this.b = this.add.circle(300, this.game.config.height - 200, 30, 0xfffff);

        this.b.setInteractive({ draggable: true });
        //code below taken from https://labs.phaser.io/edit.html?src=src/input/dragging/drag%20horizontally.js
        //~~~~~~~~
        this.input.on('drag', (pointer, gameObject, dragX) => {

            //  By clamping dragX we can keep it within
            //  whatever bounds we need
            dragX = Phaser.Math.Clamp(dragX, 100, this.game.config.width - 200);

            //  By only applying the dragX we can limit the drag
            //  to be horizontal only
            gameObject.x = dragX;

        });
        //~~~~~~~~~
    }

    update() {
        if (this.b.x == this.g.x) {
            this.scene.start('l2');
        }
    }

}
//LEVEL 2
class Level2 extends Phaser.Scene {
    constructor() {
        super('l2');
    }
    preload() {

    }
    init(data){
        this.seconds = data.seconds || 0;
    }
    create() {
        this.time.addEvent({
            delay: 100,
            loop: true,
            callback: () => {
                this.seconds+=0.1;
            }
        });
        this.cameras.main.setBackgroundColor('#228b22');
        let b = this.add.circle(300, 775, 35, 0xfffff);
        let ball_obj = this.physics.add.existing(b, 0);
        this.ball = ball_obj.body;
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1.05);
        this.ball.setVelocity(250);
        this.ball.onOverlap = true;
        this.ball.onCollide = true;

        let g = this.add.circle(this.game.config.width - 200, 225, 125, 0xffffff);
        let g_obj = this.physics.add.existing(g, 0);
        this.goal = g_obj.body;
        this.goal.allowGravity = false;
        this.goal.onOverlap = true;

        let p = this.add.rectangle(0, this.game.config.height, 150, 200).setFillStyle(0xff0000);
        this.l = this.add.rectangle(210, this.game.config.height + 75, 120, 35).setFillStyle(0x000000);
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

        this.physics.add.collider(
            this.ball,
            this.player,
            null,
            (ball, player) => {
                if (this.ball.y <= this.player.y || this.ball.y <= this.leg.y) {
                    this.touches++;
                }
            }
        );

        this.physics.add.collider(
            this.ball,
            this.leg,
            null,
            (ball, leg) => {
                if (this.ball.y <= this.leg.y) {
                    this.touches++;
                }
            });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.overlap(this.ball, this.goal);

        this.add.tween({
            targets: g,
            duration: 4000,
            x: { from: 350, to: this.game.config.width - 200 },
            yoyo: true,
            repeat: -1,
            ease: 'back.in'
        })
        this.touches = 0;
    }
    update() {
        this.physics.world.on('collide', (ball, player) => {
            this.ball.setVelocityY(-555);
            this.ball.setBounce(1.06)
        })
        this.physics.world.on('collide', (ball, leg) => {
            this.ball.setVelocityY(-555);
            this.ball.setBounce(1.06)
        })

        this.physics.world.on('overlap', () => {
            this.scene.start('l2_done', { touches: this.touches, seconds: this.seconds});
        })

        this.leg.y = this.player.y + 165;

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-400);
            this.leg.x = this.player.x - 125;
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(400);
            this.leg.x = this.player.x + 155;
        }
        else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.space.isDown && this.player.onFloor()) {
            this.player.setVelocityY(-250);
        }

        this.input.keyboard.on('keydown-' + 'R', () => {
            this.scene.start('l2');
        })

    }
}

//END OF LEVEL 2
class Level2_Done extends Phaser.Scene {
    constructor() {
        super('l2_done')
    }

    preload() {

    }
    init(data) {
        this.touches = data.touches;
        this.seconds = data.seconds;
    }
    create() {
        this.cameras.main.setBackgroundColor('#228b22');
        this.add.text(300, 400, "Time: " + this.seconds).setFontSize(35);
        this.add.text(this.game.config.width / 3, 200, "LEVEL 2 COMPLETED!").setFontSize(65);
        this.add.text(300, 300, "You’re doing amazing!! You’re off to the big leagues now, kid!").setWordWrapWidth(1500).setFontSize(45);
        this.add.text(300, 1000, "[Slide the ball to the right to keep going!]").setFontSize(35)
        this.g = this.add.circle(this.game.config.width - 200, this.game.config.height - 200, 50, 0x000000);
        this.b = this.add.circle(300, this.game.config.height - 200, 30, 0xfffff);

        this.b.setInteractive({ draggable: true });
        //code below taken from https://labs.phaser.io/edit.html?src=src/input/dragging/drag%20horizontally.js
        //~~~~~~~~
        this.input.on('drag', (pointer, gameObject, dragX) => {

            //  By clamping dragX we can keep it within
            //  whatever bounds we need
            dragX = Phaser.Math.Clamp(dragX, 100, this.game.config.width - 200);

            //  By only applying the dragX we can limit the drag
            //  to be horizontal only
            gameObject.x = dragX;

        });
        //~~~~~~~~~
    }

    update() {
        if (this.b.x == this.g.x) {
            this.scene.start('l3');
        }
    }

}

class Level3 extends Phaser.Scene {
    constructor() {
        super('l3')
    }

    preload() {

    }
    init(data){
        this.seconds = data.seconds || 0;
    }
    create() {
        this.time.addEvent({
            delay: 100,
            loop: true,
            callback: () => {
                this.seconds+=0.1;
            }
        });
        this.cameras.main.setBackgroundColor('#228b22');
        let b = this.add.circle(300, 775, 35, 0xfffff);
        let ball_obj = this.physics.add.existing(b, 0);
        this.ball = ball_obj.body;
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1.05);
        this.ball.setVelocity(250);
        this.ball.onOverlap = true;
        this.ball.onCollide = true;

        let g = this.add.circle(this.game.config.width - 200, 225, 125, 0xffffff);
        let g_obj = this.physics.add.existing(g, 0);
        this.goal = g_obj.body;
        this.goal.allowGravity = false;
        this.goal.onOverlap = true;

        let p = this.add.rectangle(0, this.game.config.height, 150, 200).setFillStyle(0xff0000);
        this.l = this.add.rectangle(210, this.game.config.height + 75, 120, 35).setFillStyle(0x000000);
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

        let p2 = this.add.rectangle(this.game.config.width - 300, this.game.config.height, 150, 200).setFillStyle(0x0000ff);
        let player2_obj = this.physics.add.existing(p2, 0);
        this.player2 = player2_obj.body;
        this.player2.onOverlap = true;
        this.player2.onCollide = true;
        this.player2.setBounce(0.2);
        this.player2.setCollideWorldBounds(true);

        this.physics.add.collider(
            this.ball,
            this.player,
            null,
            (ball, player) => {
                if ((this.ball.y <= this.player.y || this.ball.y <= this.leg.y)) {
                    this.touches++;
                }
            }
        );

        this.physics.add.collider(
            this.ball,
            this.leg,
            null,
            (ball, leg) => {
                if (this.ball.y < this.leg.y) {
                    this.touches++;
                }
            });

        this.physics.add.collider(
            this.ball,
            this.player2,
            null
        );

        this.physics.add.collider(this.player, this.player2);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.overlap(this.ball, this.goal);

        this.add.tween({
            targets: g,
            duration: 4000,
            x: { from: 350, to: this.game.config.width - 200 },
            yoyo: true,
            repeat: -1,
            ease: 'back.in'
        })
        this.touches = 0;

        this.add.tween({
            targets: p2,
            duration: 2000,
            x: { from: this.game.config.width / 2, to: this.game.config.width - 300 },
            yoyo: true,
            repeat: -1,
            ease: 'quint.out'
        })
    }
    update() {
        this.physics.world.on('collide', (ball, player) => {
            this.ball.setVelocityY(-555);
            this.ball.setBounce(1.06)
        })
        this.physics.world.on('collide', (ball, leg) => {
            this.ball.setVelocityY(-555);
            this.ball.setBounce(1.06)
        })

        this.physics.world.on('collide', (ball, player2) => {
            this.ball.setVelocityY(-555);
            this.ball.setBounce(1.06);
        })
        this.physics.world.on('overlap', () => {
            this.scene.start('l3_done', { touches: this.touches, seconds: this.seconds });
        })

        this.leg.y = this.player.y + 165;

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-400);
            this.leg.x = this.player.x - 125;
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(400);
            this.leg.x = this.player.x + 155;
        }
        else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.space.isDown && this.player.onFloor()) {
            this.player.setVelocityY(-250);
        }

        this.input.keyboard.on('keydown-' + 'R', () => {
            this.scene.start('l3');
        })

    }
}

class Level3_Done extends Phaser.Scene {
    constructor() {
        super('l3_done')
    }

    preload() {

    }
    init(data) {
        this.touches = data.touches;
        this.seconds = data.seconds;
    }
    create() {
        this.cameras.main.setBackgroundColor('#228b22');
        this.add.text(300, 470, "Time: " + this.seconds).setFontSize(35);
        this.add.text(this.game.config.width / 3, 200, "LEVEL 3 COMPLETED!").setFontSize(65);
        this.add.text(300, 300, "ICONIC! Keep doing what you’re doing and you’re going to go far. I promise! :-) \nThank you for playing!!").setWordWrapWidth(1500).setFontSize(45);
        this.add.text(300, 1000, "[Slide the ball to the right to play again!]").setFontSize(35)
        this.g = this.add.circle(this.game.config.width - 200, this.game.config.height - 200, 50, 0x000000);
        this.b = this.add.circle(300, this.game.config.height - 200, 30, 0xfffff);

        this.b.setInteractive({ draggable: true });
        //code below taken from https://labs.phaser.io/edit.html?src=src/input/dragging/drag%20horizontally.js
        //~~~~~~~~
        this.input.on('drag', (pointer, gameObject, dragX) => {

            //  By clamping dragX we can keep it within
            //  whatever bounds we need
            dragX = Phaser.Math.Clamp(dragX, 100, this.game.config.width - 200);

            //  By only applying the dragX we can limit the drag
            //  to be horizontal only
            gameObject.x = dragX;

        });
        //~~~~~~~~~
    }

    update() {
        if (this.b.x == this.g.x) {
            this.scene.start('l1');
        }
    }
}
class Studio extends Phaser.Scene {
    constructor() {
        super('studio');
    }

    preload() {
        this.load.image('logo', 'assets/studiologo.jpg');
    }

    create() {
        this.cameras.main.fadeIn(2000);
        this.cameras.main.setBackgroundColor('#949494');
        let frame = this.add.rectangle(970, 540, 550, 450, '0xffffff');
        let logo = this.add.sprite(970, 540, 'logo');
        logo.setScale(0.5, 0.5);
        let s_text = this.add.text(750, 840, "Next Slide Studio", { fontFamily: "noto", fontSize: 64 });
        this.time.delayedCall(3000, () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => this.scene.start('title'));
        });
    }
}

class Click extends Phaser.Scene {
    constructor() {
        super('click');
    }
    create() {
        this.cameras.main.setBackgroundColor('#228b22');
        this.add.text(655, 540, "Click to begin.").setFontSize(55);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => this.scene.start('studio'));
        });
    }
}

class Title extends Phaser.Scene {
    constructor() {
        super('title');
    }
    preload() {
    }
    create() {

        this.cameras.main.setBackgroundColor('#228b22');
        this.add.text(655, 355, "Silly Soccer").setFontSize(55);
        let play = this.add.text(655, 540, "Play!").setFontSize(45);
        play.setInteractive();
        play.alpha = 0.05;
        this.tweens.add({
            targets: play,
            alpha: { from: 0.05, to: 1 },
            duration: 1500,
            repeat: -1,
            yoyo: true
        });
        play.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => {
                this.scene.start('l1');
            });
        });

        let controls = this.add.text(655, 740, "How to Play").setFontSize(45);
        controls.setInteractive();
        controls.alpha = 0.05;
        this.tweens.add({
            targets: controls,
            alpha: { from: 0.05, to: 1 },
            duration: 1500,
            repeat: -1,
            yoyo: true
        });
        controls.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => {
                this.scene.start('controls');
            });
        });
    }
}
class Controls extends Phaser.Scene {
    constructor() {
        super('controls');
    }

    create() {
        this.cameras.main.setBackgroundColor('#228b22');
        let content = [
            'Left Arrow Key: Move Left',
            'Right Arrow Key: Move Right',
            'Spacebar: Jump',
            'R key: Restart current level'
        ]
        this.add.text(355, 240, 'Objective: Control the soccer player to get the ball into the goal at the top of the screen!!').setFontSize(65).setWordWrapWidth(1500);
        this.add.text(355, 540, "CONTROLS:").setFontSize(55);
        this.add.text(355, 590, content).setFontSize(45);
        let back = this.add.text(355, 840, "Go back.").setFontSize(45);
        back.setInteractive();
        back.alpha = 0.05;
        this.tweens.add({
            targets: back,
            alpha: { from: 0.05, to: 1 },
            duration: 1500,
            repeat: -1,
            yoyo: true
        });
        back.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => {
                this.scene.start('title');
            });
        });
    }
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300
            }
        }
    },
    scene: [Click, Studio, Title, Controls, Level1, Level1_Done, Level2, Level2_Done, Level3, Level3_Done],
    title: "Physics Demo"
});