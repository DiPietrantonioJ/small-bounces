var GameUI = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function GameUI ()
    {
        Phaser.Scene.call(this, { key: 'GameUI', active: false });
    },


    preload: function() {
    },

    create: function ()
    {
        width = this.sys.game.canvas.width;
        height = this.sys.game.canvas.height;
        seedsCount = 0;
        maxHeight = 0;
        actualHeight = 0;
        clockCount = -1;
        displayEnd = false;
        Timer = false;
        uiSeed = this.add.image(25, 25 ,"seedUI").setOrigin(0,0).setScale(0.7);
        seedCounter = this.add.text(100, 25, 'x0', { font: '100px FredokaOne', fill: '#FFFFFF', stroke: '#000000', strokeThickness: 15 });
        playerHeightCounter = this.add.text(25, 125, '0m', { font: '100px FredokaOne', fill: '#FFFFFF', stroke: '#000000', strokeThickness: 15 });
        
        // Restart Menu
        resetButton = this.add.image(width/2-250, (height/2)+300, "reset").setOrigin(0.5,0.5).setScale(0.8).setInteractive();
        miniResetButton = this.add.image(width-50, 50, "reset").setOrigin(1,0).setScale(0.5).setInteractive();
        ExitButton = this.add.image(width/2+250, (height/2)+300, "exitButton").setOrigin(0.5,0.5).setScale(0.8).setInteractive();
        perdiste = this.add.text(width/2, (height/2)-500, '¡Te caiste!', { font: '150px FredokaOne', fill: '#FFFFFF', stroke: '#000000', strokeThickness: 15 }).setOrigin(0.5,0.5);
        record = this.add.text(width/2, (height/2)-200, 'Record: 0m', { font: '100px FredokaOne', fill: '#FFFFFF', stroke: '#000000', strokeThickness: 15 }).setOrigin(0.5,0.5);
        seedIcon = this.add.image(width/2, (height/2)-50, "seedUI").setOrigin(1,0.5);
        seedsRecord = this.add.text((width/2)+2, (height/2)-40, '0', { font: '100px FredokaOne', fill: '#FFFFFF', stroke: '#000000', strokeThickness: 15 }).setOrigin(0,0.5);
        resetButton.visible = false;
        ExitButton.visible = false;
        perdiste.visible = false;
        record.visible = false;
        seedIcon.visible = false;
        seedsRecord.visible = false;

        // Shoot Menu
        powerIcon = this.add.image(width/2+120, height/3, "powerIcon").setOrigin(0.5);
        powerCounter = this.add.text(width/2+120, height/3, "0", { font: '120px FredokaOne', fill: '#FFFFFF', stroke: '#000000', strokeThickness: 15 }).setOrigin(0.5);
        clockIcon = this.add.image(width/2-120, height/3, "clockIcon").setOrigin(0.5);
        clockCounter = this.add.text(width/2-120, height/3, "3", { font: '120px FredokaOne', fill: '#FF1010', stroke: '#000000', strokeThickness: 15 }).setOrigin(0.5);
        powerIcon.visible = false;
        powerCounter.visible = false;
        clockIcon.visible = false;
        clockCounter.visible = false;

        eventsCenter.on('stopPlay', function () {
            if (!displayEnd) {
                seedsRecord.setText(''+seedsCount+'');
                record.setText('Record: ' + maxHeight + 'm');
                resetButton.visible = true;
                ExitButton.visible = true;
                perdiste.visible = true;
                record.visible = true;
                seedIcon.visible = true;
                seedsRecord.visible = true;
                miniResetButton.visible = false;
            }
        }, this);

        eventsCenter.on('startTimer', function () {
            powerIcon.visible = true;
            powerCounter.visible = true;
            clockIcon.visible = true;
            clockCounter.visible = true;
            Timer = true;
        }, this);

        eventsCenter.on('stopTimer', function () {
            powerIcon.visible = false;
            powerCounter.visible = false;
            clockIcon.visible = false;
            clockCounter.visible = false;
            Timer = false;
            powerCounter.setText("0");
            clockCounter.setText("3");
        }, this);

        eventsCenter.on('addPowerCounter', function (powerCount) {
            powerCounter.setText("" + powerCount);
            
        }, this);

        eventsCenter.on('setClockCounter', function (clockCount) {
            clockCounter.setText("" + clockCount);
        }, this);

        resetButton.on('pointerdown', function (pointer) {
            resetButtonPressed = this.add.image(width/2-250, (height/2)+300, "resetPress").setOrigin(0.5,0.5).setScale(0.8);
            resetButtonPressed.setDepth(1);
            LevelScene = this.scene.get('Level');
            LevelScene.scene.restart();
            clockCount = -1;
            this.registry.storedSeeds += seedsCount;
            maxHeight = 0;
            setTimeout(function() {
                resetButtonPressed.destroy();
                resetButton.visible = false;
                ExitButton.visible = false;
                perdiste.visible = false;
                record.visible = false;
                seedIcon.visible = false;
                seedsRecord.visible = false;
                miniResetButton.visible = true;
            }, 25);
        }, this);

        miniResetButton.on('pointerdown', function (pointer) {
            miniResetButtonPressed = this.add.image(width-50, 50, "resetPress").setOrigin(1,0).setScale(0.5);
            miniResetButtonPressed.setDepth(1);
            LevelScene = this.scene.get('Level');
            LevelScene.scene.restart();
            clockCount = -1;
            this.registry.storedSeeds += seedsCount;
            maxHeight = 0;
            setTimeout(function() {
                miniResetButtonPressed.destroy();
                resetButton.visible = false;
                ExitButton.visible = false;
                perdiste.visible = false;
                record.visible = false;
                seedIcon.visible = false;
                seedsRecord.visible = false;
                miniResetButton.visible = true;
            }, 25);
        }, this);

        ExitButton.on('pointerdown', function (pointer) {
            ExitButtonPressed = this.add.image(width/2+250, (height/2)+300, "exitPress").setOrigin(0.5,0.5).setScale(0.8).setInteractive();
            ExitButtonPressed.setDepth(1);
            this.registry.storedSeeds += seedsCount;
            maxHeight = 0;
            setTimeout(function() {
                ExitButtonPressed.destroy();
                resetButton.visible = false;
                ExitButton.visible = false;
                perdiste.visible = false;
                record.visible = false;
                seedIcon.visible = false;
                seedsRecord.visible = false;
            }, 25);
            this.scene.stop('Level');
            this.scene.pause('GameUI');
            this.scene.start('MainMenu');
        }, this);

        eventsCenter.on('updateHeight', function (calculatedHeight) {
            if (calculatedHeight*-1 < 0) {
                calculatedHeight = 0;
            } else {
                playerHeightCounter.setText((calculatedHeight*-1).toFixed(0) + 'm');
                if ((calculatedHeight*-1) > maxHeight) {
                    maxHeight = (calculatedHeight*-1).toFixed(0);
                }
            }
        }, this);

        eventsCenter.on('addSeed', function (seedCount) {
            seedCounter.setText('x' + seedCount);
            seedsRecord.setText(''+seedsCount);
            seedsCount = seedCount;
        }, this);
    },

    update: function(time, delta) {
        if (Timer) {
            if (clockCount == -1) {
                clockCount = time;
            } else {
                clockCounter.setText('' + 3 - Math.floor((time - clockCount)/1000));
            }
        }
    }

});