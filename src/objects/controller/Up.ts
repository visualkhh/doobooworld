import { WorldObj } from 'objects/base/WorldObj';
import { CanvasSet } from 'domains/CanvasSet';
import { Direction } from 'objects/controller/Direction';
import { PointVector } from 'math/PointVector';

export class Up extends Direction {
    getDowmImageUrl(): string {
        return 'assets/images/controller/tile_0791.png';
    }

    getNormalImageUrl(): string {
        return 'assets/images/controller/tile_0757.png';
    }
    getSpeed(): PointVector {
        return new PointVector(0, -0.1, 0);
    }

    getKey(): string[] {
        return ['ArrowUp'];
    }
}
