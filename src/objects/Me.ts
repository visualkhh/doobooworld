import { CanvasSet } from 'domains/CanvasSet';
import { WorldObj } from 'objects/base/WorldObj';
import { PointVector } from 'math/PointVector';
import { Space } from 'objects/Space';
import { User } from 'objects/User';
import { Sim } from 'simple-boot-core/decorators/SimDecorator';
import { UserDetailsData } from 'models/models';
import { filter } from 'rxjs';
import { UserService } from 'services/UserService';
import { ResourceManager } from 'manasgers/ResourceManager';

@Sim()
export class Me extends User {

    private userData?: UserDetailsData;
    private image?: HTMLImageElement;

    constructor(private userService: UserService, private resourceManager: ResourceManager, private space: Space) {
        super(0);
        this.userService.subject.pipe(filter(it => it.use)).subscribe(it => {
            this.userData = it;
            this.x = it.world.position.x;
            this.y = it.world.position.y;
            this.w = 1;
            this.y = 1;
        });
        this.resourceManager.loadImage('assets/images/objects/ptdb/normal.png').subscribe(it => this.image = it);
    }

    isWorkable(): boolean {
        return this.userData !== undefined && this.image !== undefined && this.space.isWorkable();
    }

    animationFrame(timestamp: number): void {

    }

    onDraw(canvasSet: CanvasSet): void {
        const context = canvasSet.context;
        const center = canvasSet.getCenter();
        const tileVolumePx = this.space.tils?.config.getTileVolumePx()!;
        const tileByPx = this.space.tils!.getTileByPx(center)!
        this.x = tileByPx.xIdx;
        this.y = tileByPx.yIdx;
        context.fillStyle = 'rgba(54,54,54,0.25)'
        context.fillRect(tileByPx.x, tileByPx.y, tileVolumePx, tileVolumePx);
        // const tile = this.space.tils!.getTile(this.x, this.y);
        // if (!tile.canDraw()) {
        //     return;
        // }
        // console.log('-------', tile)
        context.drawImage(this.image!, center.x - tileVolumePx / 2, center.y - tileVolumePx / 2, tileVolumePx, tileVolumePx)
        // context.drawImage(this.image!, tile.x, tile.y, this.space.tils!.config.getTileVolumePx() * this.w, this.space.tils!.config.getTileVolumePx() * this.h)
    }
}
