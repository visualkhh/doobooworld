import { Drawble } from 'draws/Drawble';
import { Position } from 'domains/Position';
import { CanvasSet } from 'domains/CanvasSet';

export class Tile extends Drawble {

    tileSpaceSize = 1;

    constructor(public canvasSet: CanvasSet, public position: Position, public size: number) {
        super();
        this.size = 5;
        // setTimeout(() => {
        //     this.size = 5;
        // }, 5000)
    }

    onDraw(): void {
        // calc
        let tileWidthSize = this.size;
        const tileSize = this.canvasSet.canvas.width / tileWidthSize
        let tileHeightSize = this.canvasSet.canvas.height / tileSize;
        console.log('-->', tileWidthSize, tileHeightSize, tileSize)
        tileWidthSize += this.tileSpaceSize;
        tileHeightSize += this.tileSpaceSize;

        const context = this.canvasSet.clearResetCanvas();
        context.translate(-(tileSize / 2),-(tileSize / 2));
        context.translate(0, 0);
        context.lineWidth = 1;

        for (let y = 0; y < tileHeightSize; y++) {
            for (let x = 0; x < tileWidthSize; x++) {
                context.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
            }
        }


    }
}
