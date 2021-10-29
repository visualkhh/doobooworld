import { Point } from 'math/Point';
import { PointVector } from 'math/PointVector';

export class CanvasSet {
    constructor(public canvas: HTMLCanvasElement, public context: CanvasRenderingContext2D = canvas.getContext('2d')!) {
    }

    resetClearCanvas() {
        let canvasRenderingContext2D = this.resetContext();
        this.clearCanvas();
        return canvasRenderingContext2D;
    }
    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    resetContext() {
        this.context.restore();
        this.context.font = '30pt Calibri';
        this.context.textAlign = 'center';
        this.context.fillStyle = 'black';
        this.context.fillStyle = 'black';
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.save();
        return this.context;
    }

    getCenter() {
        return new PointVector(this.width / 2, this.height / 2, 0)
    }

    get width() {
        return this.canvas.width;
    }

    get height() {
        return this.canvas.height;
    }

    set width(width: number) {
        this.canvas.width = width;
    }

    set height(height: number) {
        this.canvas.height = height;
    }
}
