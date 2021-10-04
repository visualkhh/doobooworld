export class CanvasSet {
    constructor(public canvas: HTMLCanvasElement, public context: CanvasRenderingContext2D = canvas.getContext('2d')!) {
    }

    clearResetCanvas() {
        this.clearCanvas();
        return this.resetContext();
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

    set width(width: number) {
        this.canvas.width = width;
    }

    set height(height: number) {
        this.canvas.height = height;
    }
}
