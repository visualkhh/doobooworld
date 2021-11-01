import { PointVector } from 'math/PointVector';
import { Obj } from 'objects/base/Obj';
import { TilesConfig } from 'objects/tiles/Tiles';

export class Tile extends Obj {
    xIdx: number = 0;
    yIdx: number = 0;

    constructor(public config: TilesConfig) {
        super();
    }


    isIncludePoint(point: PointVector) {
        return (
            this.x <= point.x &&
            this.x + this.w >= point.x &&
            this.y <= point.y &&
            this.y + this.h >= point.y
        );
    }

    canDraw(config: TilesConfig = this.config) {
        const spacing = -1
        const endX = this.x + this.w + spacing;
        const endY = this.y + this.h + spacing;
        const startXSw = (this.x > config.displayStart.x && this.x < config.displayEnd.x);
        const endXSw = (endX >= config.displayStart.x && endX < config.displayEnd.x);
        const startYSw = (this.y > config.displayStart.y && this.y < config.displayEnd.y);
        const endYSw = (endY > config.displayStart.y && endY < config.displayEnd.y);
        return (startXSw || endXSw) && (startYSw || endYSw)
    }
}
