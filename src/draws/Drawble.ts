import { CanvasSet } from 'domains/CanvasSet';

export interface Drawble {
    onDraw(canvasSet?: CanvasSet): void;
}
