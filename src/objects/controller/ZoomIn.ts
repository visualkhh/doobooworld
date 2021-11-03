import { WorldObj } from 'objects/base/WorldObj';
import { CanvasSet } from 'domains/CanvasSet';
import { Direction } from 'objects/controller/Direction';
import { PointVector } from 'math/PointVector';

export class ZoomIn extends Direction {
    getDowmImageUrl(): string {
        return 'assets/images/controller/tile_0719.png';
    }

    getNormalImageUrl(): string {
        return 'assets/images/controller/tile_0685.png';
    }

    getSpeed(): PointVector {
        return new PointVector(0, 0, -0.1);
    }

    getKey(): string[] {
        return ['+', '='];
    }


}
