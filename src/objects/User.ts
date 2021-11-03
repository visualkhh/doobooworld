import { CanvasSet } from 'domains/CanvasSet';
import { WorldObj } from 'objects/base/WorldObj';
import { PointVector } from 'math/PointVector';
import { Space } from 'objects/Space';

export class User extends WorldObj {



    animationFrame(timestamp: number): void {

    }

    // click(point: PointVector, event: MouseEvent) {
    //
    // }


    isWorkable(): boolean {
        return true;
    }

    onDraw(canvasSet: CanvasSet): void {
    }
}
