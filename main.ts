controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (custom.isUpFrom(projectile, playerSprite)) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . 8 8 . . . . 
            . . . . 7 7 . . . . 
            . . . . 7 7 . . . . 
            . . . . 7 7 . . . . 
            . . . 7 7 7 7 . . . 
            . . . 7 7 7 7 . . . 
            . . . 7 7 7 7 . . . 
            . . . . 7 7 . . . . 
            . . . . 6 6 . . . . 
            . . . . 4 4 . . . . 
            `, playerSprite, 0, -50)
    }
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.halo, 500)
    game.setGameOverEffect(false, effects.bubbles)
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fire, 500)
})
let enemySprite: Sprite = null
let projectile: Sprite = null
let playerSprite: Sprite = null
playerSprite = sprites.create(img`
    . . e e e e e e . . 
    . . . . c c . . . . 
    . . . . 4 c . . . . 
    . . . 4 4 4 4 . . . 
    . . 4 4 4 4 4 4 . . 
    . 4 4 4 4 4 4 4 4 . 
    4 4 4 4 4 4 4 4 4 4 
    e e e e e e e e e e 
    e e e e e e e e c c 
    . e e e e e e c c . 
    `, SpriteKind.Player)
controller.moveSprite(playerSprite, 100, 0)
playerSprite.setPosition(scene.screenWidth() / 2, scene.screenHeight())
playerSprite.setStayInScreen(true)
effects.starField.startScreenEffect()
game.onUpdateInterval(2000, function () {
    if (randint(0, 7) != 0) {
        enemySprite = sprites.create(img`
            ....................
            ....................
            ....................
            ....2222...2222.....
            ...222222.222222....
            ..222222222222222...
            ..222222222222222...
            ..222222222222222...
            ..222222222222222...
            ..222222222222222...
            ..222222222222222...
            ...2222222222222....
            ....22222222222.....
            .....222222222......
            ......2222222.......
            .......22222........
            ........222.........
            .........2..........
            .........2..........
            ....................
            `, SpriteKind.Enemy)
        enemySprite.setPosition(randint(8, scene.screenWidth()), 0)
        enemySprite.setVelocity(0, 10)
    }
})
