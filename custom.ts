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
        if (sprite && reference) {
            return sprite.bottom < reference.top;
        }
        screen.drawLine(0,0,100,100,8);
        return true;
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
