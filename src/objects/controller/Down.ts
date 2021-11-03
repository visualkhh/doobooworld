import { WorldObj } from 'objects/base/WorldObj';
import { CanvasSet } from 'domains/CanvasSet';
import { Direction } from 'objects/controller/Direction';
import { PointVector } from 'math/PointVector';

export class Down extends Direction {
    getDowmImageUrl(): string {
        return 'assets/images/controller/tile_0793.png';
    }

    getNormalImageUrl(): string {
        return 'assets/images/controller/tile_0759.png';
    }

    getSpeed(): PointVector {
        return new PointVector(0, 0.1, 0);
    }

    getKey(): string[] {
        return ['ArrowDown'];
    }


}
