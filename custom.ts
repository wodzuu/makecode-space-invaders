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
        return true;
    }
}
