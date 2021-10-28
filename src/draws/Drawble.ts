import { CanvasSet } from 'domains/CanvasSet';

export interface Drawble {
    animationFrame(timestamp: number): void;
    onDraw(canvasSet?: CanvasSet): void;
}
