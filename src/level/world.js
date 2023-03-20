function spawnSeeds() {
    if (j < -1000) {
        seedsQuantity = (Math.random() -0.5) * 2;
        for (k=0;k<seedsQuantity;k++){
            seedX = Math.random() * ((width-100) - 100) + 100;
            seeds.create(seedX,j,"seed");
        }
    }
}

function collectSeeds(player, seed) {
    seedCount++;
    seed.disableBody(true, true);
    eventsCenter.emit('addSeed', seedCount);
}

function activateSpring(player, spring) {
    if (player.body.velocity.y > 0) {
        player.body.velocity.y = (player.body.velocity.y * 0.8) * -1;
    } else {
        player.body.velocity.y = player.body.velocity.y * 1.1;
    }
    player.body.velocity.x = (player.body.velocity.x * 1.1);
    this.add.image(spring.x, spring.y, 'upButtonOff').setDepth(15).flipX = spring.flipX;
    spring.disableBody(true, true);
}

function hitObstacle(player, obstacle) {
    player.body.velocity.y = player.body.velocity.y * 0.8;
    obstacle.disableBody(true, true);
}

function spawnBackground() {
    if (j < -10000 && j > -145000) {
        bgItem = Math.random() * 1;
        bgItemScale = Math.random() * 1 + 0.1;
        bgItemDepth = Math.floor(Math.random() * (15 - 5) + 5);
        bgItemSprite = 'cloud';
        if (bgItem > 0.8) {
            bgItemX = Math.random() * (((width*2)-100) - 100) + 100;
            bgItemY = Math.random() * (((height/2)-100) - 100) + 100;
            bg.create(bgItemX,j-bgItemY,bgItemSprite).setScale(bgItemScale).setDepth(bgItemDepth);
        }
    }
    if (j < -300000) {
        bgItem = Math.random() * 1;
        bgItemSprite = 'backgroundAlien';
        if (bgItem > 0.95) {
            bgItemX = Math.random() * (((width*2)-100) - 100) + 100;
            bgItemY = Math.random() * (((height/2)-100) - 100) + 100;
            bg.create(bgItemX,j-bgItemY,bgItemSprite).setDepth(-1);
        }
    }
    if (j < -150000) {
        bgItem = Math.random() * 1;
        bgItemSprite = 'satellite';
        if (bgItem > 0.9) {
            bgItemX = Math.random() * (((width*2)-100) - 100) + 100;
            bgItemY = Math.random() * (((height/2)-100) - 100) + 100;
            obstacles.create(bgItemX,j-bgItemY,bgItemSprite).setDepth(8).setScale(1.1).setBounce(0.8);
        }
    }

    if (j < 0) {
        bgItem = Math.floor(Math.random() * 1.2);
        bgItemSprite = 'upButton';
        if (bgItem > 0.7) {
            bgItemX = Math.floor(Math.random() * 2);
            switch(bgItemX) {
                case 0:
                    bgItemX = 35;
                    bgItemFlip = false;
                    break;
                case 1:
                    bgItemX = width - 35;
                    bgItemFlip = true;
                    break;
            }
            springs.create(bgItemX,j,bgItemSprite).setDepth(15).flipX = bgItemFlip;
        }
    }
}

function renderWorld() {
    if (player.y-preRenderValue < j) {
        j = j - height/2;
        spawnBackground();
        spawnSeeds();
    }
}

function levelSetBackgroundColor() {
    if (player.y > -145000) {
        colorOffset = player.y;
    } else {
        colorOffset = (player.y * -1) -145000;
    }
    RedBg = 200+(colorOffset/700);
    if (RedBg < 0 ) {
        RedBg = 0;
    }
    GreenBg = 200+(colorOffset/1000);
    if (GreenBg < 0 ) {
        GreenBg = 0;
    }
    BlueBg = 255+(colorOffset/500);
    if (BlueBg < 0 ) {
        BlueBg = 0;
    }
    sky = new Phaser.Display.Color(RedBg, GreenBg, BlueBg);
    mainCamera.setBackgroundColor(sky);
}