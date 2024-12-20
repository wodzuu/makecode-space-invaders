namespace SpriteKind {
    export const EnemyProjectile = SpriteKind.create()
    export const Shield = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.EnemyProjectile, SpriteKind.Player, function (sprite, otherSprite) {
    if (shieldOn > 0) {
        shieldOn += -1
    } else {
        info.changeLifeBy(-1)
    }
    extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createFullPresetsSpreadEffectData(ExtraEffectPresetColor.Fire, ExtraEffectPresetShape.Explosion), 100, 30, 5)
    sprites.destroy(sprite)
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.InBackground)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (custom.isRightFrom(playerProjectile, playerSprite)) {
        playerProjectile = sprites.createProjectileFromSprite(img`
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
    setShieldOn()
})
info.onScore(30, function () {
    info.changeLifeBy(1)
    setShieldOn()
})
info.onScore(10, function () {
    info.changeLifeBy(1)
    setShieldOn()
})
function setShieldOn () {
    shieldOn = 1
    animation.runImageAnimation(
    shieldSprite,
    [img`
        . . . . 9 9 9 9 9 9 9 . . . . . 
        . . 9 9 . . . . . . . 9 9 . . . 
        . 9 . . . . . . . . . . . 9 . . 
        . 9 . . . . . . . . . . . 9 . . 
        9 . . . . . . . . . . . . . 9 . 
        9 . . . . . . . . . . . . . 9 . 
        9 . . . . . . . . . . . . . 9 . 
        9 . . . . . . . . . . . . . 9 . 
        9 . . . . . . . . . . . . . 9 . 
        9 . . . . . . . . . . . . . 9 . 
        9 . . . . . . . . . . . . . 9 . 
        . 9 . . . . . . . . . . . 9 . . 
        . 9 . . . . . . . . . . . 9 . . 
        . . 9 9 . . . . . . . 9 9 . . . 
        . . . . 9 9 9 9 9 9 9 . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . 9 9 9 9 9 9 9 . . . . 
        . . . 9 9 . . . . . . . 9 9 . . 
        . . 9 . . . . . . . . . . . 9 . 
        . . 9 . . . . . . . . . . . 9 . 
        . 9 . . . . . . . . . . . . . 9 
        . 9 . . . . . . . . . . . . . 9 
        . 9 . . . . . . . . . . . . . 9 
        . 9 . . . . . . . . . . . . . 9 
        . 9 . . . . . . . . . . . . . 9 
        . 9 . . . . . . . . . . . . . 9 
        . 9 . . . . . . . . . . . . . 9 
        . . 9 . . . . . . . . . . . 9 . 
        . . 9 . . . . . . . . . . . 9 . 
        . . . 9 9 . . . . . . . 9 9 . . 
        . . . . . 9 9 9 9 9 9 9 . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . 9 9 9 9 9 9 9 . . . . 
        . . . 9 9 . . . . . . . 9 9 . . 
        . . 9 . . . . . . . . . . . 9 . 
        . . 9 . . . . . . . . . . . 9 . 
        . 9 . . . . . . . . . . . . . 9 
        . 9 . . . . . . . . . . . . . 9 
        . 9 . . . . . . . . . . . . . 9 
        . 9 . . . . . . . . . . . . . 9 
        . 9 . . . . . . . . . . . . . 9 
        . 9 . . . . . . . . . . . . . 9 
        . 9 . . . . . . . . . . . . . 9 
        . . 9 . . . . . . . . . . . 9 . 
        . . 9 . . . . . . . . . . . 9 . 
        . . . 9 9 . . . . . . . 9 9 . . 
        . . . . . 9 9 9 9 9 9 9 . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . 9 9 9 9 9 9 9 . . . . . 
        . . 9 9 . . . . . . . 9 9 . . . 
        . 9 . . . . . . . . . . . 9 . . 
        . 9 . . . . . . . . . . . 9 . . 
        9 . . . . . . . . . . . . . 9 . 
        9 . . . . . . . . . . . . . 9 . 
        9 . . . . . . . . . . . . . 9 . 
        9 . . . . . . . . . . . . . 9 . 
        9 . . . . . . . . . . . . . 9 . 
        9 . . . . . . . . . . . . . 9 . 
        9 . . . . . . . . . . . . . 9 . 
        . 9 . . . . . . . . . . . 9 . . 
        . 9 . . . . . . . . . . . 9 . . 
        . . 9 9 . . . . . . . 9 9 . . . 
        . . . . 9 9 9 9 9 9 9 . . . . . 
        `],
    100,
    true
    )
    custom.after(10000, function () {
        shieldOn = 0
    })
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    if (shieldOn > 0) {
        shieldOn += -1
    } else {
        info.changeLifeBy(-1)
    }
    extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createFullPresetsSpreadEffectData(ExtraEffectPresetColor.Fire, ExtraEffectPresetShape.Explosion), 100, 30, 5)
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
let enemyProjectile: Sprite = null
let enemySprite: Sprite = null
let star: Sprite = null
let playerProjectile: Sprite = null
let shieldOn = 0
let shieldSprite: Sprite = null
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
shieldSprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Shield)
shieldSprite.follow(playerSprite, 1000)
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
    if (shieldOn == 0) {
        shieldSprite.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    }
})
game.onUpdateInterval(500, function () {
    if (Math.percentChance(60)) {
        if (Math.percentChance(50)) {
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
            if (Math.percentChance(50)) {
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
            } else {
                enemySprite = sprites.create(img`
                    . . . . . . . . . a 
                    . . . . . . . . a a 
                    . . . . a a a a a a 
                    a . . a a a a a a . 
                    a a a a 4 4 a a . . 
                    a a a a 4 4 a a . . 
                    a . . a a a a a a . 
                    . . . . a a a a a a 
                    . . . . . . . . a a 
                    . . . . . . . . . a 
                    `, SpriteKind.Enemy)
                enemySprite.setPosition(scene.screenWidth(), randint(0, scene.screenHeight()))
                enemySprite.setVelocity(randint(-35, -25), 0)
                enemySprite.setFlag(SpriteFlag.DestroyOnWall, true)
                custom.runEvery(enemySprite, 3000, function (s) {
                    enemyProjectile = sprites.createProjectileFromSprite(img`
                        . . . . . . . . . . 
                        . . . . . . . . . . 
                        . . . . . . . . . . 
                        . . . . . . b b . . 
                        2 2 a 2 a 2 b 2 4 5 
                        2 a 2 a 2 a 2 2 4 5 
                        . . . . . . b b . . 
                        . . . . . . . . . . 
                        . . . . . . . . . . 
                        . . . . . . . . . . 
                        `, s, -50, 0)
                    enemyProjectile.setKind(SpriteKind.EnemyProjectile)
                })
            }
        }
    }
})
