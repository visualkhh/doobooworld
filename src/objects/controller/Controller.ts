import { CanvasSet } from 'domains/CanvasSet';
import { WorldObj } from 'objects/base/WorldObj';
import { PointVector } from 'math/PointVector';
import { Sim } from 'simple-boot-core/decorators/SimDecorator';
import { Me } from 'objects/Me';
import { filter } from 'rxjs';
import { WorldManager } from 'manasgers/WorldManager';
import { WorldData } from 'models/models';
import { MathUtil } from 'utils/MathUtil';
import { Up } from 'objects/controller/Up';
import { Down } from 'objects/controller/Down';
import { Left } from 'objects/controller/Left';
import { Right } from 'objects/controller/Right';
import { ResourceManager } from 'manasgers/ResourceManager';
import { Space } from 'objects/Space';
import { ZoomIn } from 'objects/controller/ZoomIn';
import { ZoomOut } from 'objects/controller/ZoomOut';
import { Direction } from 'objects/controller/Direction';

@Sim()
export class Controller extends WorldObj {

    private worldData?: WorldData;
    private up: Up;
    private down: Down;
    private left: Left;
    private right: Right;
    private zoomIn: ZoomIn;
    private zoomOut: ZoomOut;
    private controllers: Direction[];
    constructor(private worldManager: WorldManager, private resourceManager: ResourceManager, private space: Space, private me: Me) {
        super(0);
        this.up = new Up(resourceManager);
        this.down = new Down(resourceManager);
        this.left = new Left(resourceManager);
        this.right = new Right(resourceManager);
        this.zoomIn = new ZoomIn(resourceManager);
        this.zoomOut = new ZoomOut(resourceManager);
        this.controllers = [this.up, this.down, this.left, this.right, this.zoomIn, this.zoomOut];
        this.worldManager.subject.pipe(filter(it => it.use)).subscribe(it => this.worldData = it);
    }

    isWorkable(): boolean {
        return this.worldData !== undefined && this.me.isWorkable();
    }

    animationFrame(timestamp: number): void {
        this.controllers.filter(it => it.isPress()).forEach(it => {
            this.space.add(it.getSpeed());
        })
    }

    click(point: PointVector, event: MouseEvent) {
        return true;
    }


    mouseDown(point: PointVector, event: MouseEvent) {
        const booleans = this.controllers.map(it => it.mouseDown(point, event)).filter(it => it);
        return booleans.length > 0;
    }
    mouseUp(point: PointVector, event: MouseEvent) {
        const booleans = this.controllers.map(it => it.mouseUp(point, event)).filter(it => it);
        return booleans.length > 0;
    }

    keyDown(event: KeyboardEvent) {
        const booleans = this.controllers.map(it => it.keyDown(event)).filter(it => it);
        return booleans.length > 0;
    }

    keyUp(event: KeyboardEvent) {
        const booleans = this.controllers.map(it => it.keyUp(event)).filter(it => it);
        return booleans.length > 0;
    }

    onDraw(canvasSet: CanvasSet): void {
        const context = canvasSet.context;
        const marginLeftPercent = 2;
        const marginBottomPercent = 2;
        const sizePercent = 20;
        this.x = MathUtil.getValueByTotInPercent(canvasSet.width, marginLeftPercent);
        this.y = MathUtil.getValueByTotInPercent(canvasSet.height, 100 - marginBottomPercent - sizePercent);
        this.w = this.h = MathUtil.getValueByTotInPercent(canvasSet.height, sizePercent);
        // context.strokeRect(this.x, this.y, this.w, this.h);

        this.zoomIn.x = this.x + MathUtil.getValueByTotInPercent(this.w, 66);
        this.zoomIn.y = this.y;
        this.zoomIn.w = MathUtil.getValueByTotInPercent(this.w, 33);
        this.zoomIn.h = MathUtil.getValueByTotInPercent(this.w, 33);
        this.zoomIn.onDrawWrokable(canvasSet)

        this.zoomOut.x = this.x;
        this.zoomOut.y = this.y;
        this.zoomOut.w = MathUtil.getValueByTotInPercent(this.w, 33);
        this.zoomOut.h = MathUtil.getValueByTotInPercent(this.w, 33);
        this.zoomOut.onDrawWrokable(canvasSet)

        this.up.x = this.x + MathUtil.getValueByTotInPercent(this.w, 33);
        this.up.y = this.y + MathUtil.getValueByTotInPercent(this.h, 33);
        this.up.w = MathUtil.getValueByTotInPercent(this.w, 33);
        this.up.h = MathUtil.getValueByTotInPercent(this.w, 33);
        this.up.onDrawWrokable(canvasSet)

        this.down.x = this.x + MathUtil.getValueByTotInPercent(this.w, 33);
        this.down.y = this.y + MathUtil.getValueByTotInPercent(this.h, 66);
        this.down.w = MathUtil.getValueByTotInPercent(this.w, 33);
        this.down.h = MathUtil.getValueByTotInPercent(this.w, 33);
        this.down.onDrawWrokable(canvasSet)

        this.left.x = this.x;
        this.left.y = this.y + MathUtil.getValueByTotInPercent(this.h, 66);
        this.left.w = MathUtil.getValueByTotInPercent(this.w, 33);
        this.left.h = MathUtil.getValueByTotInPercent(this.w, 33);
        this.left.onDrawWrokable(canvasSet)

        this.right.x = this.x + MathUtil.getValueByTotInPercent(this.w, 66);;
        this.right.y = this.y + MathUtil.getValueByTotInPercent(this.h, 66);
        this.right.w = MathUtil.getValueByTotInPercent(this.w, 33);
        this.right.h = MathUtil.getValueByTotInPercent(this.w, 33);
        this.right.onDrawWrokable(canvasSet)

        // MathUtil.getValueByTotInPercent()
    }
}
