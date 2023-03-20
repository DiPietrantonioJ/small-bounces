function autoMoveCannon(time) {
    if (cannon.angle < -90 || cannon.angle > 90) {
        setAngleValue = setAngleValue*-1;
    } 
    cannon.angle = cannon.angle + setAngleValue;
}

function evalShootCannon(time) {
    if (chargeShoot) {
        if (beginTimer < Math.round((time)-3000) && beginTimer != 0) {
            chargeShoot = false;
            player.setVelocity(Math.sin((Math.PI/180)*shootAngle)*(setBasePower*shootPower),-(Math.cos((Math.PI/180)*shootAngle)*(setBasePower*shootPower)));
            alreadyShoot = true;
        } else {
            if (beginTimer == 0) {
                beginTimer = Math.round(time);
            }
        }
    }
}

function actionOnCannon() {
    if (!alreadyShoot) {
        if (angleReady) {
            shootPower++;
            eventsCenter.emit('addPowerCounter', shootPower);
            if (!chargeShoot) {
                chargeShoot = true;
            }
        } else {
            setAngleValue = 0;
            shootAngle = cannon.angle;
            player.angle = shootAngle;
            angleReady = true;
        }
    }
}