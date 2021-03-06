import { CanvasSet } from 'domains/CanvasSet';
import { UserDetailsData, WorldData } from 'models/models';
import { WorldObj } from 'objects/base/WorldObj';
import { PointVector } from 'math/PointVector';
import { MathUtil } from 'utils/MathUtil';
import { Tiles } from 'objects/tiles/Tiles';
import { WorldManager } from 'manasgers/WorldManager';
import { UserService } from 'services/UserService';
import { filter, zip } from 'rxjs';
import { Sim } from 'simple-boot-core/decorators/SimDecorator';

@Sim()
export class Space extends WorldObj {
    tils?: Tiles;
    points: PointVector[] = [];
    current = new PointVector();
    currentFrame = 0;
    private worldData?: WorldData;
    private userData?: UserDetailsData;
    private displayStart?: PointVector;
    private displayEnd?: PointVector;

    constructor(public worldManager: WorldManager, public userService: UserService) {
        super();
        zip(this.worldManager.subject.pipe(filter(it => it.use)), this.userService.subject.pipe(filter(it => it.use))).subscribe(it => {
            this.worldData = it[0]
            this.userData = it[1];
            this.pbf = this.worldData?.pbf
            this.x = this.userData.world.position.x;
            this.y = this.userData.world.position.y;
            this.z = this.userData.world.zoom;
            this.tils = new Tiles(this.worldData.w, this.worldData.h);
        });
        this.points = [
            // new PointVector(10, 10, 10),
            // new PointVector(10, 20, 1100),
            // new PointVector(10, 480, 1100),
            // new PointVector(10, 500, 10),
        ]

        // console.log('-->', this.tils)
    }

    public before = new PointVector();

    animationFrame(timestamp: number): void {
        if (this.worldData && this.points && this.points.length > 0) {
            this.current = MathUtil.bezier(this.points, this.worldData.frame, this.currentFrame);
            this.add(PointVector.sub(this.current, this.before));
            this.before = this.current;
            if (this.worldData.frame <= this.currentFrame + 1) {
                this.currentFrame = 0;
                this.points = [];
                this.before = this.current = new PointVector();
            }
            this.currentFrame++;
        }
        // console.log('this->', this.current, current);
    }

    doneMove() {
        this.currentFrame = 0;
        this.points = [];
        // this.direction = Direction.NONE;
    }

    up() {
        const starts = [new PointVector(0, 0, 0), new PointVector(0, -0.2, 0)];
        const ends = [new PointVector(0, -0.8, 0), new PointVector(0, -1, 0)]
        this.points = [...starts, ...ends]
        this.currentFrame = 0
    }

    down() {
        const starts = [new PointVector(0, 0, 0), new PointVector(0, 0.2, 0)];
        const ends = [new PointVector(0, 0.8, 0), new PointVector(0, 1, 0)]
        this.points = [...starts, ...ends]
        this.currentFrame = 0
    }

    left() {
        const starts = [new PointVector(0, 0, 0), new PointVector(-0.2, 0, 0)];
        const ends = [new PointVector(-0.8, 0, 0), new PointVector(-1, 0, 0)]
        this.points = [...starts, ...ends]
        this.currentFrame = 0
    }

    right() {
        const starts = [new PointVector(0, 0, 0), new PointVector(0.2, 0, 0)];
        const ends = [new PointVector(0.8, 0, 0), new PointVector(1, 0, 0)]
        this.points = [...starts, ...ends]
        this.currentFrame = 0;
    }

    zoomIn() {
        const starts = [new PointVector(0, 0, 0), new PointVector(0, 0, -0.2)];
        const ends = [new PointVector(0, 0, -0.8), new PointVector(0, 0, -1)]
        this.points = [...starts, ...ends]
        this.currentFrame = 0;
    }

    zoomOut() {
        const starts = [new PointVector(0, 0, 0), new PointVector(0, 0, 0.2)];
        const ends = [new PointVector(0, 0, 0.8), new PointVector(0, 0, 1)]
        this.points = [...starts, ...ends]
        this.currentFrame = 0;
    }

    public clicked: PointVector[] = []

    click(point: PointVector, event: MouseEvent) {
        const tileByPx = this.tils!.getTileByPx(point);
        if (tileByPx) {
            const dest = PointVector.sub(new PointVector(tileByPx.xIdx, tileByPx.yIdx), this)
            dest.z = 0;
            const starts = [new PointVector(0, 0, 0)];
            const ends = [dest]
            this.points = [...starts, ...ends]
            this.currentFrame = 0;
        }
        this.clicked.push(point);
        return true;
    }


    isWorkable(): boolean {
        return (this.worldData !== undefined && this.userData !== undefined && this.tils !== undefined);
    }

    onDraw(canvasSet: CanvasSet): void {
        this.displayStart = new PointVector(MathUtil.getValueByTotInPercent(20, canvasSet.width), MathUtil.getValueByTotInPercent(20, canvasSet.height));
        this.displayEnd = new PointVector(canvasSet.width, canvasSet.height).sub(this.displayStart);
        this.tils!.config.set(this.displayStart, this.displayEnd, this.z);

        // display
        // canvasSet.context.beginPath();
        // canvasSet.context.arc(this.tils.config.displayStart.x, this.tils.config.displayStart.y, 5, 0, 2 * Math.PI);
        // canvasSet.context.stroke();
        // canvasSet.context.beginPath();
        // canvasSet.context.arc(this.tils.config.displayEnd.x, this.tils.config.displayEnd.y, 5, 0, 2 * Math.PI);
        // canvasSet.context.stroke();

        const context = canvasSet.context;
        const center = canvasSet.getCenter(); // .add(10, 10, 10);
        context.lineWidth = 0.5;
        context.textAlign = "left";
        context.textBaseline = "top";
        context.font = '10px malgun gothic';


        // context.drawImage()
        // const tils1 = this.tils.setPosition(this.x, this.y, canvasSet.getCenter()).tils;
        // console.log(this.x, this.y, '--- ')
        this.tils!.setPosition(this.x, this.y, center).canDrawTiles().forEach(it => {
            it.forEach(sit => {
                context.fillText(`${sit.xIdx}, ${sit.yIdx}`, sit.x, sit.y);
                context.strokeRect(sit.x, sit.y, sit.w, sit.h);
            })
        });


        // this.clicked.forEach(it => {
        //     canvasSet.context.beginPath();
        //     canvasSet.context.arc(it.x, it.y, 5, 0, 2 * Math.PI);
        //     canvasSet.context.stroke();
        // });


        // this.tils.setPosition(this.x, this.y, canvasSet.getCenter()).tils.forEach(it => {
        //     const tiles = it.filter(sit => {
        //         const endX = sit.x + sit.w;
        //         const endY = sit.y + sit.h;
        //         return  ((sit.x >= 0  && sit.x <= canvasSet.width) || (endX >= 0  && endX <= canvasSet.width)) &&
        //                 ((sit.y >= 0  && sit.y <= canvasSet.height) || (endY >= 0  && endY <= canvasSet.height))
        //     });
        //     console.log('size-- >', tiles.length)
        //     tiles.forEach(sit => {
        //         context.fillText(`${sit.xIdx}, ${sit.yIdx}`, sit.x, sit.y);
        //         context.strokeRect(sit.x, sit.y, sit.w, sit.h);
        //     })
        // });
        // const x = center.x - (tileSize / 2);
        // const y = center.y - (tileSize / 2);
        // context.fillText(`${this.x}, ${this.y}`, x, y);
        // context.strokeRect(x, y, tileSize, tileSize);

        // context.strokeRect(10, 10, 20, 20);


        // let tileWidthSize = this.w;
        // let tileHeightSize = canvasSet.canvas.height / tileSize;
        // // console.log('-->', tileWidthSize, tileHeightSize, tileSize)
        // tileWidthSize += this.tileSpaceSize;
        // tileHeightSize += this.tileSpaceSize;
        //
        // const context = canvasSet.resetClearCanvas();
        // // context.translate(-(tileSize / 2),-(tileSize / 2));
        // // context.translate(this.x, this.y);
        // context.lineWidth = 0.5;
        //
        // for (let y = 0; y < tileHeightSize; y++) {
        //     for (let x = 0; x < tileWidthSize; x++) {
        //         const x1 = (x * tileSize) - (tileSize / 2);
        //         const y1 = (y * tileSize) - (tileSize / 2);
        //         context.strokeRect(x1, y1, tileSize, tileSize);
        //     }
        // }

        // context.translate()

        // debug
        canvasSet.resetContext();
        context.strokeStyle = '#f00'
        this.points.forEach(it => {
            canvasSet.context.beginPath();
            canvasSet.context.arc(it.x + 100, it.y + 100, 5, 0, 2 * Math.PI);
            canvasSet.context.stroke();
        })
        // //
        // if (this.dcurrent) {
        //     canvasSet.context.strokeStyle = '#00f'
        //     canvasSet.context.beginPath();
        //     canvasSet.context.arc(this.dcurrent.x+100, this.dcurrent.y+100, 3, 0, 2 * Math.PI);
        //     canvasSet.context.stroke();
        // }


        // const point = {point1: this.point1, point2: this.point2, point3: this.point3, point4: this.point4};
        // console.log('ppoo', point)
        // const pointVectors = new Array(30).fill(undefined);
        // for (let i = 0; i < pointVectors.length; i++) {
        //     pointVectors[i] = MathUtil.bezier(this.point, 30, i);
        // }
        // // console.log('ppoo2', point)
        // const pointVectors2 = MathUtil.beziers(this.point, 30);

        // console.log('----', pointVectors, pointVectors2);
        // console.log('---*******************-');
        // for (let i = 0; i < 30; i++) {
        //     console.log('----', pointVectors[i], pointVectors2[i]);
        // }
        // from(pointVectors).pipe(concatMap(it => of(it).pipe(delay(10)))).subscribe(final => {
        //     canvasSet.context.strokeStyle = '#000'
        //     canvasSet.context.beginPath();
        //     canvasSet.context.arc(final.x, final.y, 3, 0, 2 * Math.PI);
        //     canvasSet.context.stroke();
        // })
        //
        //
        // from(pointVectors2).pipe(concatMap(it => of(it).pipe(delay(10)))).subscribe(final => {
        //     canvasSet.context.strokeStyle = '#f00'
        //     canvasSet.context.beginPath();
        //     canvasSet.context.arc(final.x, final.y, 3, 0, 2 * Math.PI);
        //     canvasSet.context.stroke();
        // })


        const pointVector = this.displayEnd.get().sub(this.displayStart);
        context.strokeRect(
            this.displayStart.x, this.displayStart.y,
            pointVector.x, pointVector.y);
    }
}
