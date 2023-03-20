var Inventory = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Inventory ()
    {
        Phaser.Scene.call(this, { key: 'Inventory' });
        this.score = 0;
    },

    preload: function() {
    },

    create: function (){
        select = 0;
        skinsdata = this.cache.json.get('skins');
        for (i=0; i<skinsdata.length; i++){
            if (skinsdata[i].name == this.registry.playerSprite) {
                select = i;
            }
        }
        
        width = this.sys.game.canvas.width;
        height = this.sys.game.canvas.height;

        shopUiSeed = this.add.image(50, 50 ,"seedUI").setOrigin(0,0);
        shopSeedCounter = this.add.text(150, 65, 'x' + this.registry.storedSeeds, { font: '125px FredokaOne', fill: '#FFFFFF', stroke: '#000000', strokeThickness: 15 });

        skinPreview = this.add.image(width/2,height/2,skinsdata[select].name).setScale(0.7).setOrigin(0.5,0.5);
        previousButtonPressed = this.add.image(50, height-200, 'smallWideButtonPressed').setOrigin(0,0.45).setScale(0.5);
        previousButton = this.add.image(50, height-200, 'smallWideButton').setOrigin(0,0.45).setScale(0.5).setInteractive();
        previousArrow = this.add.image(140, height-230, 'arrow').setOrigin(0,0.45).setScale(0.4).setDepth(11).flipX = true;
        selectButtonPressed = this.add.image(width/2, height-200, 'smallWideButtonPressed').setOrigin(0.5,0.45).setScale(0.5);
        selectButton = this.add.image(width/2, height-200, 'smallWideButton').setOrigin(0.5,0.45).setScale(0.5).setInteractive();
        selectOk = this.add.image(width/2, height-230, 'okIcon').setOrigin(0.5,0.45).setScale(0.45).setDepth(11);
        selectLock = this.add.image(width/2, height-230, 'lockIcon').setOrigin(0.5,0.45).setScale(0.3).setDepth(11);
        selectPriceIcon = this.add.image(width/2, height-230, 'priceIcon').setOrigin(0.5,0.45).setScale(0.5).setDepth(11);
        selectPrice = this.add.text(width/2+100, height/2+250, skinsdata[select].value, { font: '150px FredokaOne', fill: '#FFFFFF', stroke: '#000000', strokeThickness: 15 }).setOrigin(0,0.5).setDepth(11);
        selectSeedIcon = this.add.image(width/2+80, height/2+250,"seedUI").setOrigin(1,0.5).setDepth(11);
        nextButtonPressed = this.add.image(width-50, height-200, 'smallWideButtonPressed').setOrigin(1,0.45).setScale(0.5);
        nextButton = this.add.image(width-50, height-200, 'smallWideButton').setOrigin(1,0.45).setScale(0.5).setInteractive();
        previousArrow = this.add.image(width-140, height-230, 'arrow').setOrigin(1,0.45).setScale(0.4).setDepth(11);
        
        selectLock.visible = false;
        selectPriceIcon.visible = false;
        selectPrice.visible = false;
        selectSeedIcon.visible = false;
        
        backButton = this.add.image(width-50, 50, 'exitButton').setOrigin(1,0).setScale(0.5).setInteractive();
        backButton.on('pointerdown', function (pointer) {
            backButtonPressed = this.add.image(width-50, 50, 'exitButtonPress').setOrigin(1,0).setScale(0.5).setInteractive();
            backButtonPressed.setDepth(1);
            setTimeout(function() {
                backButtonPressed.destroy();
                eventsCenter.emit('closeInventory');
            }, 25);
        }, this);

        previousButton.on('pointerdown', function (pointer) {
            if ((select-1) < 0) {
                select = skinsdata.length-1;
            } else {
                select--;
            }
            previousButton.setDepth(0);
            previousButtonPressed.setDepth(10);
            setTimeout(function(){
                previousButtonPressed.setDepth(0);
                previousButton.setDepth(10);
            }, this);
            skinPreview.destroy();
            skinPreview = this.add.image(width/2,height/2,skinsdata[select].name).setScale(0.7).setOrigin(0.5,0.5);
            if (skinsdata[select].unlock) {
                selectLock.visible = false;
                selectPriceIcon.visible = false;
                selectPrice.visible = false;
                selectSeedIcon.visible = false;
                selectOk.visible = true;
            } else {
                if (this.registry.storedSeeds >= skinsdata[select].value) {
                    selectPriceIcon.visible = true;
                    selectLock.visible = false;
                    selectPrice.setStyle({color: '#FFFFFF'});
                }   else {
                    selectPriceIcon.visible = false;
                    selectLock.visible = true;
                    selectPrice.setStyle({color: '#FF0000'});
                }
                selectPrice.setText(skinsdata[select].value);
                selectSeedIcon.visible = true;
                selectPrice.visible = true;
                selectOk.visible = false;
            }
        }, this);

        nextButton.on('pointerdown', function (pointer) {
            if ((select+1) == skinsdata.length) {
                select = 0;
            } else {
                select++;
            }
            nextButton.setDepth(0);
            nextButtonPressed.setDepth(10);
            setTimeout(function() {
                nextButtonPressed.setDepth(0);
                nextButton.setDepth(10);
            }, this);
            skinPreview.destroy();
            skinPreview = this.add.image(width/2,height/2,skinsdata[select].name).setScale(0.7).setOrigin(0.5,0.5);
            if (skinsdata[select].unlock) {
                selectLock.visible = false;
                selectPriceIcon.visible = false;
                selectPrice.visible = false;
                selectSeedIcon.visible = false;
                selectOk.visible = true;
            } else {
                if (this.registry.storedSeeds >= skinsdata[select].value) {
                    selectPriceIcon.visible = true;
                    selectLock.visible = false;
                    selectPrice.setStyle({color: '#FFFFFF'});
                }   else {
                    selectPriceIcon.visible = false;
                    selectLock.visible = true;
                    selectPrice.setStyle({color: '#FF0000'});
                }
                selectPrice.setText(skinsdata[select].value);
                selectSeedIcon.visible = true;
                selectPrice.visible = true;
                selectOk.visible = false;
            }
        }, this);

        selectButton.on('pointerdown', function (pointer) {
            if (skinsdata[select].unlock) {
                this.registry.playerSprite = skinsdata[select].name;
                selectButton.setDepth(0);
                selectButtonPressed.setDepth(10);
                setTimeout(function(){
                    selectButtonPressed.setDepth(0);
                    selectButton.setDepth(10);
                }, this);
            } else {
                if (this.registry.storedSeeds >= skinsdata[select].value) {
                    this.registry.storedSeeds -= skinsdata[select].value;
                    skinsdata[select].unlock = true;
                    this.registry.playerSprite = skinsdata[select].name;
                    selectLock.visible = false;
                    selectPriceIcon.visible = false;
                    selectPrice.visible = false;
                    selectSeedIcon.visible = false;
                    selectOk.visible = true;
                    selectButton.setDepth(0);
                    selectButtonPressed.setDepth(10);
                    setTimeout(function(){
                        selectButtonPressed.setDepth(0);
                        selectButton.setDepth(10);
                    }, this);
                }
            }
            
        }, this);

        eventsCenter.on('closeInventory', function () {
            this.scene.start('MainMenu');
            this.scene.stop('Inventory');
        }, this);
    }

});