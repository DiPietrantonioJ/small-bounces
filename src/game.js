const config = {
    width: 1,
    height: 1,
    parent: "container",
    type: Phaser.CANVAS,
    backgroundColor: "#FFF000",
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 0},
            debug: false
        }
    },
    pixelArt: false,
    scene: [ MainMenu, Level, GameUI, Shop, Inventory ]
}

var game = new Phaser.Game(config);