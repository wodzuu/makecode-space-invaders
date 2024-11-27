//% block="Custom" weight=300 color=#0fbc11 icon=""
namespace custom {

    /**
     * Check if one sprite is located higher on the screen than another one
     */
    //% block="is $sprite located up from $reference sprite"
    //% sprite.defl=sprite
    //% sprite.shadow=variables_get
    //% reference.defl=reference
    //% reference.shadow=variables_get
    export function isUpFrom(sprite: Sprite, reference: Sprite): boolean {
        if (!isDestroyed(sprite) && !isDestroyed(reference)) {
            return sprite.bottom < reference.top;
        }
        return true;
    }

    /**
     * Check if one sprite is located to the right on the screen than another one
     */
    //% block="is $sprite located to the right from $reference sprite"
    //% sprite.defl=sprite
    //% sprite.shadow=variables_get
    //% reference.defl=reference
    //% reference.shadow=variables_get
    export function isRightFrom(sprite: Sprite, reference: Sprite): boolean {
        if (sprite && reference) {
            return sprite.left > reference.right;
        }
        return true;
    }

    //% block="set $follower follow $sprite with vx $vx and vy $vy"
    //% sprite.defl=sprite
    //% sprite.shadow=variables_get
    //% follower.defl=reference
    //% follower.shadow=variables_get
    //% vx.defl=1
    //% vy.defl=1
    //% inlineInputMode=inline
    export function follow(follower: Sprite, sprite: Sprite, vx: number, vy:number): void {
        game.onUpdateInterval(100, ()=>{
            if (vx != 0) follower.vx = (sprite.x - follower.x) * vx;
            if (vy != 0) follower.vy = (sprite.y - follower.y) * vy;
        });
    }

    //% block="with $sprite every $interval ms process $s"
    //% sprite.defl=sprite
    //% sprite.shadow=variables_get
    //% interval.defl=1
    //% inlineInputMode=inline
    //% s.defl=thatSprite
    //% handlerStatement
    //% draggableParameters
    export function runEvery(sprite: Sprite, interval: number, handler: (s: Sprite) => void): void {
        game.onUpdateInterval(interval, () => { 
            if(!isDestroyed(sprite)) handler(sprite) 
        });
    }

    /**
     * Returns true if the given sprite does not exist,
     * or is destroyed, and false otherwise.
     */
    //% block="$sprite is destroyed"
    //% blockId=spriteutilextisdestroyed
    //% help=github:arcade-sprite-util/docs/is-destroyed
    //% sprite.shadow=variables_get
    //% sprite.defl=mySprite
    //% weight=100
    //% group=Sprite
    export function isDestroyed(sprite: Sprite): boolean {
        return !sprite || !!(sprite.flags & sprites.Flag.Destroyed);
    }

    let setup: boolean = false;
    //% block
    export function drawRectangle(): void {
        if(!setup){
            game.onPaint(()=>{
                screen.drawCircle(30,30,10,4);
            })
            setup = true;
        }
        // const i: Image = image.screenImage()//image.create(30,30);
        // i.drawRect(0, 0, 30, 30, 8);
    }
}
