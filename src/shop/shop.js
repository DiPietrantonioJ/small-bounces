var Shop = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Shop ()
    {
        Phaser.Scene.call(this, { key: 'Shop' });
        this.score = 0;
    },

    preload: function() {
        this.load.image("cannonUpgradeLogo", "src/sprites/cannonUpgradeLogo.png");
        this.load.image("powerUpgradeLogo", "src/sprites/powerUpgradeLogo.png");
        this.load.image("gravityUpgradeLogo", "src/sprites/gravityUpgradeLogo.png");
    },

    create: function() {
        shopUiSeed = this.add.image(50, 50 ,"seedUI").setOrigin(0,0);
        shopSeedCounter = this.add.text(150, 65, 'x' + this.registry.storedSeeds, { font: '125px FredokaOne', fill: '#FFFFFF', stroke: '#000000', strokeThickness: 15 });
        shopBackButton = this.add.image(width-50, 50, 'exitButton').setOrigin(1,0).setScale(0.5).setInteractive();
        
        cannonUpgrade = this.add.image(50, 500, 'smallWideButton').setOrigin(0,0.45).setScale(0.5).setInteractive();
        cannonUpgradeLogo = this.add.image(100, 475, 'cannonUpgradeLogo').setOrigin(0,0.5).setScale(0.5);
        cannonUpgradeValue = this.add.text(70, 575, this.registry.cannonUpgradeValue, { font: '125px FredokaOne', fill: '#FFFFFF', stroke: '#000000', strokeThickness: 15 }).setOrigin(0,0.45);
        powerUpgrade = this.add.image(width/2, 500, 'smallWideButton').setOrigin(0.5,0.45).setScale(0.5).setInteractive();
        powerUpgradeLogo = this.add.image(width/2, 475, 'powerUpgradeLogo').setOrigin(0.5,0.5).setScale(0.5);
        powerUpgradeValue = this.add.text((width/2)-150, 575, this.registry.powerUpgradeValue, { font: '125px FredokaOne', fill: '#FFFFFF', stroke: '#000000', strokeThickness: 15 }).setOrigin(0,0.45);
        gravityUpgrade = this.add.image(width-50, 500, 'smallWideButton').setOrigin(1,0.45).setScale(0.5).setInteractive();
        gravityUpgradeLogo = this.add.image(width-225, 475, 'gravityUpgradeLogo').setOrigin(0.5,0.5).setScale(0.5);
        gravityUpgradeValue = this.add.text(width-375, 575, this.registry.gravityUpgradeValue, { font: '125px FredokaOne', fill: '#FFFFFF', stroke: '#000000', strokeThickness: 15 }).setOrigin(0,0.45);

        shopBackButton.on('pointerdown', function (pointer) {
            shopBackButtonPressed = this.add.image(width-50, 50, 'exitButtonPress').setOrigin(1,0).setScale(0.5).setInteractive();
            shopBackButtonPressed.setDepth(1);
            setTimeout(function() {
                shopBackButtonPressed.destroy();
                eventsCenter.emit('closeShop');
            }, this);
        }, this);

        cannonUpgrade.on('pointerdown', function (pointer) {
            if (this.registry.cannonSpeed > 1) {
                if (this.registry.storedSeeds >= this.registry.cannonUpgradeValue) {
                    cannonUpgradePressed = this.add.image(50, 500, 'smallWideButtonPressed').setOrigin(0,0.45).setScale(0.5);
                    cannonUpgradePressed.setDepth(1);
                    setTimeout(function() {
                        cannonUpgradePressed.destroy();
                    }, 25);
                    this.registry.cannonSpeed -= 1;
                    this.registry.storedSeeds -= this.registry.cannonUpgradeValue;
                    this.registry.cannonUpgradeValue = this.registry.cannonUpgradeValue * 3;
                    cannonUpgradeValue.setText(this.registry.cannonUpgradeValue);
                    shopSeedCounter.setText('x'+this.registry.storedSeeds);
                    if (this.registry.cannonSpeed == 1) {
                        cannonUpgradeValue.destroy();
                    }
                }
            }
        }, this);

        powerUpgrade.on('pointerdown', function (pointer) {
            if (this.registry.basePower < 10000) {
                if (this.registry.storedSeeds >= this.registry.powerUpgradeValue) {
                    powerUpgradePressed = this.add.image(width/2, 500, 'smallWideButtonPressed').setOrigin(0.5,0.45).setScale(0.5);
                    powerUpgradePressed.setDepth(1);
                    setTimeout(function() {
                        powerUpgradePressed.destroy();
                    }, 25);
                    this.registry.basePower += this.registry.powerAddValue;
                    this.registry.powerAddValue = this.registry.powerAddValue * 2;
                    this.registry.storedSeeds -= this.registry.powerUpgradeValue;
                    this.registry.powerUpgradeValue = this.registry.powerUpgradeValue * 2;
                    powerUpgradeValue.setText(this.registry.powerUpgradeValue);
                    shopSeedCounter.setText('x'+this.registry.storedSeeds);
                    if (this.registry.basePower >= 10000) {
                        powerUpgradeValue.destroy();
                    }
                }
            }
        }, this);

        gravityUpgrade.on('pointerdown', function (pointer) {
            if (this.registry.playerGravity > 1) {
                if (this.registry.storedSeeds >= this.registry.gravityUpgradeValue) {
                    gravityUpgradePressed = this.add.image(50, 500, 'smallWideButtonPressed').setOrigin(0,0.45).setScale(0.5);
                    gravityUpgradePressed.setDepth(1);
                    setTimeout(function() {
                        gravityUpgradePressed.destroy();
                    }, 25);
                    this.registry.playerGravity -= 100;
					if (this.registry.playerGravity == 0) {
						this.registry.playerGravity = 1;
					}
                    this.registry.storedSeeds -= this.registry.gravityUpgradeValue;
                    this.registry.gravityUpgradeValue = this.registry.gravityUpgradeValue * 4;
                    gravityUpgradeValue.setText(this.registry.gravityUpgradeValue);
                    shopSeedCounter.setText('x'+this.registry.storedSeeds);
                    if (this.registry.playerGravity <= 1) {
                        gravityUpgradeValue.destroy();
                    }
                }
            }
        }, this);

        //this.registry.storedSeeds = seedsAfterShop;
        eventsCenter.on('closeShop', function () {
            this.scene.start('MainMenu');
            this.scene.stop('Shop');
        }, this);
    }
});