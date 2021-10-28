import { CanvasSet } from 'domains/CanvasSet';
import { WorldObj } from 'objects/base/WorldObj';

export class Debug extends WorldObj {

    onProcess(): void {
    }

    onDraws(canvasSet: CanvasSet): void {
        const center = canvasSet.getCenter();
        const context = canvasSet.context;
        context.lineWidth = 4;
        context.setLineDash([4, 4]);
        context.strokeStyle = '#f00';
        context.beginPath();
        context.moveTo(0, center.y);
        context.lineTo(canvasSet.width, center.y);
        context.moveTo(center.x, 0);
        context.lineTo(center.x, canvasSet.height);
        context.stroke()
    }
}
