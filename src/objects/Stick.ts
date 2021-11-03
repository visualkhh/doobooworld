import { Obj } from 'objects/base/Obj';
import { WorldObj } from 'objects/base/WorldObj';
import { CanvasSet } from 'domains/CanvasSet';
import { WorldObjData } from 'models/models';
import { Space } from 'objects/Space';
import { DomRenderProxy } from 'dom-render/DomRenderProxy';
import { ResourceManager } from 'manasgers/ResourceManager';
export class Stick extends WorldObj {
    image?: any;
    constructor(private resourceManager: ResourceManager, private space: Space, data: WorldObjData) {
        super(data.pbf)
        this.x = data.position.x;
        this.y = data.position.y;
        this.w = data.volume.w;
        this.h = data.volume.h;
        this.resourceManager.loadImage(data.img).subscribe(it => this.image = it);
    }

    animationFrame(timestamp: number): void {
    }

    isWorkable(): boolean {
        return this.image !== undefined && this.space.isWorkable();
    }

    onDraw(canvasSet: CanvasSet): void {
        const context = canvasSet.context;
        const tile = this.space.tils!.getTileByIdx(this.x, this.y);
        if (!tile.canDraw()) {
            return;
        }
        context.drawImage(this.image, tile.x, tile.y, this.space.tils!.config.getTileVolumePx() * this.w, this.space.tils!.config.getTileVolumePx() * this.h)
    }
}
