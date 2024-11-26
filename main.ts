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
        music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
    }
})
function createStar (x_position: number) {
    if (Math.percentChance(5)) {
        star = sprites.createProjectileFromSide(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, randint(-5, -15), 0)
        star.setFlag(SpriteFlag.Ghost, true)
        star.setPosition(x_position, randint(0, scene.screenHeight()))
    }
}
info.onScore(60, function () {
    info.changeLifeBy(1)
})
info.onScore(30, function () {
    info.changeLifeBy(1)
})
info.onScore(10, function () {
    info.changeLifeBy(1)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createFullPresetsSpreadEffectData(ExtraEffectPresetColor.Fire, ExtraEffectPresetShape.Explosion), 100, 30, 5)
    info.changeLifeBy(-1)
    sprites.destroy(sprite)
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.InBackground)
})
info.onLifeZero(function () {
    sprites.destroy(playerSprite, effects.halo, 500)
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    extraEffects.createSpreadEffectOnAnchor(otherSprite, extraEffects.createFullPresetsSpreadEffectData(ExtraEffectPresetColor.Electric, ExtraEffectPresetShape.Explosion), 100, 30, 5)
    sprites.destroy(sprite)
    sprites.destroy(otherSprite)
    info.changeScoreBy(1)
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
})
let enemySprite: Sprite = null
let star: Sprite = null
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
playerSprite.setPosition(15, scene.screenHeight() / 2)
playerSprite.setStayInScreen(true)
info.setLife(3)
info.setScore(0)
for (let index = 0; index <= scene.screenWidth(); index++) {
    createStar(index)
}
extraEffects.createFullPresetsSpreadEffectData(ExtraEffectPresetColor.Fire, ExtraEffectPresetShape.Explosion).setSpreadEffectDataColorLookupTable([2, 5])
game.onUpdate(function () {
    createStar(scene.screenWidth())
})
game.onUpdate(function () {
    if (playerSprite.vy < 0) {
        playerSprite.setImage(img`
            . . . . . . . . . . 
            . . . . . . . . . . 
            2 2 . . . . . . . . 
            . 2 2 2 2 2 . . . . 
            . . 2 2 2 2 2 2 2 2 
            . . 2 2 2 2 2 2 2 2 
            . 2 2 2 2 2 2 . . . 
            2 2 2 2 3 . . . . . 
            2 2 3 . . . . . . . 
            2 3 . . . . . . . . 
            `)
    } else if (playerSprite.vy > 0) {
        playerSprite.setImage(img`
            2 3 . . . . . . . . 
            2 2 3 . . . . . . . 
            2 2 2 2 3 . . . . . 
            . 2 2 2 2 2 2 . . . 
            . . 2 2 2 2 2 2 2 2 
            . . 2 2 2 2 2 2 2 2 
            . 2 2 2 2 2 . . . . 
            2 2 . . . . . . . . 
            . . . . . . . . . . 
            . . . . . . . . . . 
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
        if (Math.percentChance(90)) {
            enemySprite = sprites.create(img`
                . . . . . . . . 9 9 
                . . . . . . 9 9 9 9 
                . . . . 9 9 9 9 9 9 
                . . 9 9 9 6 9 9 9 9 
                9 9 9 6 6 6 9 9 9 9 
                9 9 9 6 6 6 9 9 9 9 
                . . 9 9 9 6 9 9 9 9 
                . . . . 9 9 9 9 9 9 
                . . . . . . 9 9 9 9 
                . . . . . . . . 9 9 
                `, SpriteKind.Enemy)
            enemySprite.setPosition(scene.screenWidth(), randint(0, scene.screenHeight()))
            enemySprite.setVelocity(randint(-35, -25), 0)
            enemySprite.setFlag(SpriteFlag.DestroyOnWall, true)
        } else {
            enemySprite = sprites.create(img`
                . . . . . . . . 5 5 
                . . . . . . 5 5 5 5 
                . . . . 5 5 5 5 5 5 
                . . . 5 5 5 5 5 5 . 
                5 5 5 5 4 4 5 5 . . 
                5 5 5 5 4 4 5 5 . . 
                . . . 5 5 5 5 5 5 . 
                . . . . 5 5 5 5 5 5 
                . . . . . . 5 5 5 5 
                . . . . . . . . 5 5 
                `, SpriteKind.Enemy)
            enemySprite.setPosition(scene.screenWidth(), randint(0, scene.screenHeight()))
            enemySprite.setVelocity(randint(-35, -25), 0)
            enemySprite.setFlag(SpriteFlag.DestroyOnWall, true)
            custom.follow(enemySprite, playerSprite, 0, randint(0.1, 2))
        }
    }
})
