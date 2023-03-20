var Level = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Level(){
        Phaser.Scene.call(this, {key: "Level"});
    },

    preload: function() {
        
    },
    
    create: function() {
        width = this.sys.game.canvas.width;
        height = this.sys.game.canvas.height;
        preRenderValue = height*2;
        setAngleValue = this.registry.cannonSpeed;
        setBasePower = this.registry.basePower;
        setPlayerGravity = this.registry.playerGravity;
        angleReady = false;
        chargeShoot = false;
        alreadyShoot = false;
        gravity = false;
        shootPower = 0;
        shootAngle = 0;
        beginTimer = 0;
        j=preRenderValue;
        seedCount = 0;

        eventsCenter.emit('updateHeight', 0);
        eventsCenter.emit('addSeed', 0);
        bg = this.physics.add.staticGroup({
            frameQuantity: 120
        });
        bgTreesBack = this.physics.add.staticGroup({
            frameQuantity: 120
        });
        bgTreesFront = this.physics.add.staticGroup({
            frameQuantity: 120
        });
        for (i=(width*-1)+350; i<width*2; i=i+700) {
            treeScale = Math.random() * 1 + 0.2;
            treeVariation = "tree" + Math.floor(Math.random() * 3 - 0.001);
            bgTreesBack.add(this.add.image(i,height-880, treeVariation).setOrigin(0.5,0.95).setScale(treeScale));
        }
        for (i=width*-1; i<width*2; i=i+700) {
            treeScale = Math.random() * 1 + 0.2;
            treeVariation = "tree" + Math.floor(Math.random() * 3 - 0.001);
            bgTreesFront.add(this.add.image(i,height-880, treeVariation).setOrigin(0.5,0.95).setScale(treeScale));
        }
        obstacles = this.physics.add.staticGroup ({
            frameQuantity: 120
        });
        springs = this.physics.add.staticGroup({
            frameQuantity: 120
        });
        backgroundbars = this.add.container(0,0);
        for (i=0; i<width-100; i=i+100) {
            backgroundbars.add(this.add.image(i, height, "cagebar").setScale(0.25,2).setOrigin(0.5,1.75));
        }
        backgroundbars2 = this.add.container(0,0);
        for (i=0; i<width-100; i=i+100) {
            backgroundbars2.add(this.add.image(i, height, "cagebar").setScale(0.25,2).setOrigin(0.5,0.75));
        }
        sun = this.add.image(width, height, "sun").setOrigin(0.2,1).setDepth(-10);
        player = this.physics.add.image(width/2, height-1000, this.registry.playerSprite);
        cannon = this.add.image(width/2, height-1000, "cannon").setInteractive();
        support = this.add.image(width/2,height-880, "support");
        wallLeft = this.physics.add.image(0, 0, "cagebar").setScale(1,2);
        wallRight = this.physics.add.image(width, 0, "cagebar").setScale(1,2);
        ground = this.physics.add.staticGroup({
            frameQuantity: 120
        });
        ground.create(width/2,height-100, "ground").setOrigin(0.5,0.5).setScale(width/2160,1);
        groundImage = this.add.image(0,height-150, "ground").setOrigin(1,0.5).setScale(width/2160,1).setDepth(8);
        groundImage = this.add.image(width/2,height-150, "ground").setOrigin(0.5,0.5).setScale(width/2160,1).setDepth(8);
        groundImage = this.add.image(width,height-150, "ground").setOrigin(0,0.5).setScale(width/2160,1).setDepth(8);
        seeds = this.physics.add.staticGroup();
        //this.data.set('playerHeight', 1);
        player.body.maxVelocity.x = 10000;
        player.body.maxVelocity.y = 10000;
        wallLeft.body.maxVelocity.y = 10000;
        wallRight.body.maxVelocity.y = 10000;
        wallLeft.setImmovable().setDepth(9);
        wallRight.setImmovable().setDepth(9);
        player.setScale(0.25);
        player.setDepth(5);
        player.setBounce(0.5);
        player.setCollideWorldBounds(false);
        player.setOrigin(0.5,0.565);
        cannon.setScale(0.6);
        cannon.setDepth(6);
        cannon.setOrigin(0.5, 0.70);
        support.setDepth(7);
        mainCamera = this.cameras.main;
        this.physics.add.collider(player, wallLeft);
        this.physics.add.collider(player, wallRight);
        this.physics.add.collider(player, ground, endShot, null, this);
        this.physics.add.overlap(player, seeds, collectSeeds, null, this);
        this.physics.add.overlap(player, springs, activateSpring, null, this);
        this.physics.add.overlap(player, obstacles, activateSpring, null, this);
        powerButton = this.add.image(width/2, height-400, "power").setOrigin(0.5,0.5).setInteractive();
        powerButtonPressed = this.add.image(width/2, height-400, "powerpressed").setOrigin(0.5,0.5);
        fireButton = this.add.image(width/2, height-400, "fire").setOrigin(0.5,0.5).setInteractive();
        fireButtonPressed = this.add.image(width/2, height-400, "firepressed").setOrigin(0.5,0.5);
        directionButton = this.add.image(width/2, height-400, "direction").setOrigin(0.5,0.5).setInteractive().setDepth(10);
        sky = new Phaser.Display.Color(255, 255, 255);
        mainCamera.setBackgroundColor(sky);

        directionButton.on('pointerdown', function (pointer) {
            directionButtonPressed = this.add.image(width/2, height-400, "directionpressed").setOrigin(0.5,0.5).setInteractive();
            setTimeout(function() {
                fireButton.setDepth(10);
                directionButtonPressed.destroy();
                directionButton.destroy();
            }, 25);
            actionOnCannon();
        }, this);

        fireButton.on('pointerdown', function (pointer) {
            fireButtonPressed.setDepth(10);
            fireButton.setDepth(0);
            setTimeout(function() {
                powerButton.setDepth(10);
                fireButtonPressed.destroy();
                fireButton.destroy();
                eventsCenter.emit('startTimer');
            }, 25);
            actionOnCannon();
        }, this);

        powerButton.on('pointerdown', function (pointer) {
            powerButtonPressed.setDepth(10);
            powerButton.setDepth(0);
            setTimeout(function() {
                powerButton.setDepth(10);
                powerButtonPressed.setDepth(0);
            }, 25);
            actionOnCannon();
        }, this);
    },
    
    update: function(time, delta) {
        autoMoveCannon(time);
        evalShootCannon(time);
        forcePlayerPosition(time);
        playerRollWhileMoving();
        backgroundbars.x = player.x/8;
        backgroundbars.y = player.y;
        backgroundbars2.x = player.x/8;
        backgroundbars2.y = player.y;
        sun.y = player.y/1.1;
        bgTreesBack.x = player.x/30;
        bgTreesFront.x = player.x/20;
        wallLeft.y = player.y;
        wallRight.y = player.y;
        calculatePlayerHeight();
        levelSetBackgroundColor();
        //Infinite walls and random things
        renderWorld();
    }
});