import { Obj } from 'objects/base/Obj';
import { WorldObj } from 'objects/base/WorldObj';
import { CanvasSet } from 'domains/CanvasSet';
import { WorldObjData } from 'models/models';
import { Space } from 'objects/Space';
import { DomRenderProxy } from 'dom-render/DomRenderProxy';
export class PTDB extends WorldObj {
    image?: any;
    constructor(public space: Space, data: WorldObjData) {
        super(data.pbf);
        this.x = data.position.x;
        this.y = data.position.y;
        this.w = data.volume.w;
        this.h = data.volume.h;
        // const image = new Image(60, 60); // Using optional size for image
        // image.onload = () => {
        //     this.image = image;
        // }
        // image.src = 'assets/images/ptdb.jpeg';
    }

    animationFrame(timestamp: number): void {
    }

    isWorkable(): boolean {
        return this.space.isWorkable();
    }

    onDraw(canvasSet: CanvasSet): void {
        const tile = this.space.tils!.getTileByIdx(this.x, this.y);
        if (!tile.canDraw()) {
            return;
        }
        const context = canvasSet.context;
        const center = canvasSet.getCenter(); // .add(10, 10, 10);
        context.lineWidth = 0.5;
        context.textAlign = "left";
        context.textBaseline = "top";
        context.font = '10px malgun gothic';
        // if (this.image) {
        //     context.drawImage(this.image, tile.x, tile.y, this.space.tils!.config.getTileVolumePx() * this.w, this.space.tils!.config.getTileVolumePx() * this.h)
        // }
        // context.beginPath();
        // context.arc(tile.x, tile.y, 5, 0, 2 * Math.PI);
        // context.stroke();
    }
}
