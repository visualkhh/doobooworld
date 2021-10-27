import { CanvasSet } from 'domains/CanvasSet';

export interface Drawble {
    onTime(timestamp: number): void;
    onDraw(canvasSet?: CanvasSet): void;
}
