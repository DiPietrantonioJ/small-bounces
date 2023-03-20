var MainMenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function MainMenu ()
    {
        Phaser.Scene.call(this, { key: 'MainMenu', active: true });
        this.score = 0;
    },

    init: function() {
        if (this.registry.cannonSpeed == null) {
            //this.registry.cannonSpeed = localStorage.getItem('cannonSpeed');
            if (this.registry.cannonSpeed == null) {
                this.registry.cannonSpeed = 10;
            }
        }
        if (this.registry.cannonUpgradeValue == null) {
            //this.registry.cannonUpgradeValue = localStorage.getItem('cannonUpgradeValue');
            if (this.registry.cannonUpgradeValue == null) {
                this.registry.cannonUpgradeValue = 50;
            }
        }
        if (this.registry.powerUpgradeValue == null) {
            //this.registry.powerUpgradeValue = localStorage.getItem('powerUpgradeValue');
            if (this.registry.powerUpgradeValue == null) {
                this.registry.powerUpgradeValue = 50;
            }
        }
        if (this.registry.powerAddValue == null) {
            //this.registry.powerAddValue = localStorage.getItem('powerAddValue');
            if (this.registry.powerAddValue == null) {
                this.registry.powerAddValue = 100;
            }
        }
        if (this.registry.gravityUpgradeValue == null) {
            //this.registry.gravityUpgradeValue = localStorage.getItem('gravityUpgradeValue');
            if (this.registry.gravityUpgradeValue == null) {
                this.registry.gravityUpgradeValue = 50;
            }
        }
        if (this.registry.basePower == null) {
            //this.registry.basePower = localStorage.getItem('basePower');
            if (this.registry.basePower == null) {
                this.registry.basePower = 200;
            }
        }
        if (this.registry.playerGravity == null) {
            //this.registry.playerGravity = localStorage.getItem('playerGravity');
            if (this.registry.playerGravity == null) {
                this.registry.playerGravity = 500;
            }
        }
        if (this.registry.storedSeeds == null) {
            //this.registry.storedSeeds = localStorage.getItem('storedSeeds');
            if (this.registry.storedSeeds == null) {
                this.registry.storedSeeds = 0;
            }
        }
        if (this.registry.playerSprite == null) {
            //this.registry.playerSprite = localStorage.getItem('playerSprite');
            if (this.registry.playerSprite == null) {
                this.registry.playerSprite = "player";
            }
        }
    },

    preload: function() {
        // BUTTONS AND ICONS
        this.load.image("wideButton", "src/sprites/WideButton.png");
        this.load.image("wideButtonPressed", "src/sprites/WideButtonPressed.png");
        this.load.image("smallWideButton", "src/sprites/SmallWideButton.png");
        this.load.image("smallWideButtonPressed", "src/sprites/SmallWideButtonPressed.png");
        this.load.image("arrow", "src/sprites/arrow.png");
        this.load.image("okIcon", "src/sprites/ok.png");
        this.load.image("lockIcon", "src/sprites/lock.png");
        this.load.image("priceIcon", "src/sprites/price.png");
        this.load.image("Play", "src/sprites/play.png");
        this.load.image("Shop", "src/sprites/shop.png");
        this.load.image("Inventory", "src/sprites/inventory.png");
        this.load.image("seedUI", "src/sprites/seeds.png");
        this.load.image("exitButton", "src/sprites/ExitButton.png");
        this.load.image("exitButtonPress", "src/sprites/ExitButtonPressed.png");

        // PLAYER SKINS
        this.load.json("skins", "src/skinsdata.json");
        this.load.image("player", "src/sprites/player/player.png");
        this.load.image("defaultgirl", "src/sprites/player/playerGirl.png");
        this.load.image("playerBlackStainsGirl", "src/sprites/player/skins/playerBlackStainsGirl.png");
        this.load.image("playerCatGrey", "src/sprites/player/skins/playerCatGrey.png");
        this.load.image("playerCatGreyGirl", "src/sprites/player/skins/playerCatGreyGirl.png");
        this.load.image("playerCatWhite", "src/sprites/player/skins/playerCatWhite.png");
        this.load.image("playerCatWhiteGirl", "src/sprites/player/skins/playerCatWhiteGirl.png");
        this.load.image("playerGreyStainsGirl", "src/sprites/player/skins/playerGreyStainsGirl.png");
        this.load.image("playerWhite", "src/sprites/player/skins/playerWhite.png");

        // LEVEL UI
        this.load.image("reset", "src/sprites/ResetButton.png");
        this.load.image("resetPress", "src/sprites/ResetButtonPressed.png");
        this.load.image("powerIcon", "src/sprites/powerIcon.png");
        this.load.image("clockIcon", "src/sprites/clockIcon.png");

        // LEVEL
        this.load.image("power", "src/sprites/powerButton.png");
        this.load.image("powerpressed", "src/sprites/powerButtonPressed.png");
        this.load.image("fire", "src/sprites/FireButton.png");
        this.load.image("firepressed", "src/sprites/FireButtonPressed.png");
        this.load.image("direction", "src/sprites/DirectionalButton.png");
        this.load.image("directionpressed", "src/sprites/DirectionalButtonPressed.png");
        this.load.image("cannon", "src/sprites/cannon/cannon.png");
        this.load.image("seed", "src/sprites/seeds.png");
        this.load.image("ground", "src/sprites/ground.png");
        this.load.image("support", "src/sprites/support/cannon_support.png");
        this.load.image("cagebar", "src/sprites/cage_bar.png");
        this.load.image("blurcagebar", "src/sprites/blur_cage_bar.png");
        this.load.image("cloud", "src/sprites/cloud.png");
        this.load.image("backgroundAlien", "src/sprites/backgroundAlien.png");
        this.load.image("upButton", "src/sprites/upButton.png");
        this.load.image("upButtonOff", "src/sprites/upButtonOff.png");
        this.load.image("satellite", "src/sprites/satellite.png");
        this.load.image("tree0", "src/sprites/tree0.png");
        this.load.image("tree1", "src/sprites/tree1.png");
        this.load.image("tree2", "src/sprites/tree2.png");
        this.load.image("sun", "src/sprites/sun.png");
    },

    create: function () {
        width = this.sys.game.canvas.width;
        height = this.sys.game.canvas.height;
        Title = this.add.text(width/2, 250, 'Small Bounces', { font: '150px FredokaOne', fill: '#FFFFFF', stroke: '#000000', strokeThickness: 25 }).setOrigin(0.5,0.5);
        devTitle = this.add.text(width/2, 20, 'MilanesoDev | 2021', { font: '50px FredokaOne', fill: '#999000' }).setOrigin(0.5,0);
        playButton = this.add.image(width/2, 600, 'wideButton').setOrigin(0.5,0.45).setScale(0.5).setInteractive();
        playIcon = this.add.image(width/2, 575, 'Play').setOrigin(0.5,0.5).setScale(0.3);
        shopButton = this.add.image(width/2-50, 1000, 'smallWideButton').setOrigin(1,0.45).setScale(0.5).setInteractive();
        shopIcon = this.add.image(width/2-150, 975, 'Shop').setOrigin(1,0.5).setScale(0.3);
        inventoryButton = this.add.image(width/2+50, 1000, 'smallWideButton').setOrigin(0,0.45).setScale(0.5).setInteractive();
        inventoryIcon = this.add.image(width/2+150, 975, 'Inventory').setOrigin(0,0.5).setScale(0.28);
        menuCharacter = this.add.image(width, height, this.registry.playerSprite).setOrigin(0.8,0.8).setScale(1);
        menuCharacter.angle = -20;

        playButton.on('pointerdown', function (pointer) {
            playButtonPressed = this.add.image(width/2, 600, 'wideButtonPressed').setOrigin(0.5,0.45).setScale(0.5);
            playButtonPressed.setDepth(1);
            setTimeout(function() {
                playButtonPressed.destroy();
            }, 25);
            this.scene.start('GameUI');
            this.scene.start('Level');
            this.scene.stop('MainMenu');
        }, this);

        shopButton.on('pointerdown', function (pointer) {
            shopButtonPressed = this.add.image(width/2-50, 1000, 'smallWideButtonPressed').setOrigin(1,0.45).setScale(0.5);
            shopButtonPressed.setDepth(1);
            setTimeout(function() {
                shopButtonPressed.destroy();
            }, 25);
            this.scene.start('Shop');
            this.scene.stop('MainMenu');
        }, this);

        inventoryButton.on('pointerdown', function (pointer) {
            inventoryButtonPressed = this.add.image(width/2+50, 1000, 'smallWideButtonPressed').setOrigin(0,0.45).setScale(0.5);
            inventoryButtonPressed.setDepth(1);
            setTimeout(function() {
                inventoryButtonPressed.destroy();
            }, 25);
            this.scene.start('Inventory');
            this.scene.stop('MainMenu');
        }, this);

        
    }

});