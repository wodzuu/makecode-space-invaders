controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (custom.isRightFrom(projectile, playerSprite)) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . 
            . . . . . . . . . . 
            . . . . . . . . . . 
            . . b b . . . . . . 
            5 4 2 b 7 7 7 7 7 1 
            5 4 2 b 7 7 7 7 7 1 
            . . b b . . . . . . 
            . . . . . . . . . . 
            . . . . . . . . . . 
            . . . . . . . . . . 
            `, playerSprite, 50, 0)
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
    2 2 . . . . . . . . 
    . 2 2 . . . . . . . 
    . 2 2 2 2 . . . . . 
    . . 2 2 2 2 2 . . . 
    . . . 2 2 2 2 2 2 2 
    . . . 2 2 2 2 2 2 2 
    . . 2 2 2 2 2 . . . 
    . 2 2 2 2 . . . . . 
    . 2 2 . . . . . . . 
    2 2 . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(playerSprite, 0, 100)
playerSprite.setPosition(0, scene.screenHeight() / 2)
playerSprite.setStayInScreen(true)
game.setGameOverEffect(false, effects.bubbles)
info.setLife(3)
info.setScore(0)
game.onUpdate(function () {
    if (playerSprite.vx < 0) {
        playerSprite.setImage(img`
            2 2 . . . . . . . . 
            . 2 2 . . . . . . . 
            . 2 2 2 2 . . . . . 
            . . 2 2 2 2 2 . . . 
            . . . 2 2 2 2 2 2 2 
            . . . 2 2 2 2 2 2 2 
            . . 2 2 2 2 2 . . . 
            . 2 2 2 2 . . . . . 
            . 2 2 . . . . . . . 
            2 2 . . . . . . . . 
            `)
    } else {
        playerSprite.setImage(img`
            2 2 . . . . . . . . 
            . 2 2 . . . . . . . 
            . 2 2 2 2 . . . . . 
            . . 2 2 2 2 2 . . . 
            . . . 2 2 2 2 2 2 2 
            . . . 2 2 2 2 2 2 2 
            . . 2 2 2 2 2 . . . 
            . 2 2 2 2 . . . . . 
            . 2 2 . . . . . . . 
            2 2 . . . . . . . . 
            `)
    }
})
game.onUpdateInterval(500, function () {
    if (Math.percentChance(60)) {
        enemySprite = sprites.create(img`
            . . . . . . . . 9 9 
            . . . . . . 9 9 9 9 
            . . . . 9 9 9 9 9 9 
            . . 9 9 9 9 9 9 9 9 
            9 9 9 9 9 9 9 9 9 9 
            9 9 9 9 9 9 9 9 9 9 
            . . 9 9 9 9 9 9 9 9 
            . . . . 9 9 9 9 9 9 
            . . . . . . 9 9 9 9 
            . . . . . . . . 9 9 
            `, SpriteKind.Enemy)
        enemySprite.setPosition(scene.screenWidth(), randint(0, scene.screenHeight()))
        enemySprite.setVelocity(randint(-35, -25), 0)
    }
})
