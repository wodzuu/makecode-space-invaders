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
info.onScore(10, function () {
    info.setScore(0)
    info.changeLifeBy(1)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.halo, 500)
    info.changeLifeBy(-1)
})
info.onLifeZero(function () {
    sprites.destroy(playerSprite, effects.halo, 500)
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fire, 500)
    info.changeScoreBy(1)
})
let enemySprite: Sprite = null
let projectile: Sprite = null
let playerSprite: Sprite = null
playerSprite = sprites.create(img`
    . . . 6 . . 6 . . . 
    . . . 6 6 6 6 . . . 
    . . 6 6 9 9 6 6 . . 
    . . 8 6 6 6 6 8 . . 
    6 6 8 6 6 6 6 8 6 6 
    6 6 8 6 6 6 6 8 6 6 
    6 6 8 8 b b 8 . 6 6 
    6 . . 8 4 4 8 . . 6 
    6 . . . . . . . . 6 
    6 . . . . . . . . 6 
    `, SpriteKind.Player)
controller.moveSprite(playerSprite, 100, 0)
playerSprite.setPosition(scene.screenWidth() / 2, scene.screenHeight())
playerSprite.setStayInScreen(true)
effects.clouds.startScreenEffect(500)
game.setGameOverEffect(false, effects.starField)
info.setLife(3)
info.setScore(0)
game.onUpdate(function () {
    if (playerSprite.vx < 0) {
        playerSprite.setImage(img`
            . . . 6 . . 6 . . . 
            . . . 6 6 6 6 . . . 
            . . 6 6 9 9 6 6 . . 
            . . 8 6 6 6 6 8 . . 
            6 6 8 6 6 6 6 8 6 6 
            6 6 8 6 6 6 6 8 6 6 
            6 6 8 8 b b 8 6 6 6 
            6 . . 8 4 4 8 . . 6 
            6 . . . . . . . . 6 
            6 . . . . . . . . 6 
            `)
    } else {
        playerSprite.setImage(img`
            . . . 6 . . 6 . . . 
            . . . 6 6 6 6 . . . 
            . . 6 6 9 9 6 6 . . 
            . . 8 6 6 6 6 8 . . 
            6 6 8 6 6 6 6 8 6 6 
            6 6 8 6 6 6 6 8 6 6 
            6 6 8 8 b b 8 6 6 6 
            6 . . 8 4 4 8 . . 6 
            6 . . . . . . . . 6 
            6 . . . . . . . . 6 
            `)
    }
})
game.onUpdateInterval(500, function () {
    if (Math.percentChance(60)) {
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
        enemySprite.setVelocity(0, 30)
    }
})
