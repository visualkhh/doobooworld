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
        const image = new Image(60, 60); // Using optional size for image
        const thiss = this;
        image.onload = () => {
            this.image = image;
        }
        image.src = 'assets/images/ptdb.jpeg';
    }

    onProcess(): void {
    }

    onDraws(canvasSet: CanvasSet): void {
        const context = canvasSet.context;
        const tile = this.space.tils.getTile(3, 3);
        const center = canvasSet.getCenter(); // .add(10, 10, 10);
        context.lineWidth = 0.5;
        context.textAlign = "left";
        context.textBaseline = "top";
        context.font = '10px malgun gothic';
        if (this.image) {
            context.drawImage(this.image, tile.x, tile.y, this.space.tils.config.w, this.space.tils.config.w)
        }
        // context.beginPath();
        // context.arc(tile.x, tile.y, 5, 0, 2 * Math.PI);
        // context.stroke();
    }
}
