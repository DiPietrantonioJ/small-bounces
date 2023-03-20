function forcePlayerPosition(time) {
    if (alreadyShoot) {
        if (!gravity && beginTimer < Math.round((time)-3000)) {
            mainCamera.startFollow(player);
            eventsCenter.emit('stopTimer');
        }
        if (!gravity && beginTimer < Math.round((time)-5000)) {
            player.body.setGravityY(setPlayerGravity);
            gravity = true;
        }
    }
}

function playerRollWhileMoving() {
    player.angle = player.x/5;
}

function calculatePlayerHeight() {
    playerCalculatedHeight = player.y/100;
    eventsCenter.emit('updateHeight', playerCalculatedHeight);
}

function endShot() {
    eventsCenter.emit('stopPlay');
}