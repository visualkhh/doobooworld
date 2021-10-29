import { Drawble } from 'draws/Drawble';
import { Position } from 'domains/Position';
import { CanvasSet } from 'domains/CanvasSet';
import { Point } from 'math/Point';
import {Sim} from 'simple-boot-core/decorators/SimDecorator'
import { UserService } from 'services/UserService';
import { WorldManager } from 'manasgers/WorldManager';
import { UserDetails, World } from 'models/models';
import { concatMap, delay, filter, from, interval, of, take } from 'rxjs';
import { WorldObj } from 'objects/base/WorldObj';
import { PointVector } from 'math/PointVector';
import { RandomUtil } from 'utils/RandomUtil';
import { MathUtil } from 'utils/MathUtil';

export class Tile extends WorldObj {

    points: PointVector[] = [];
    current?: PointVector;
    currentFrame = 0;
    frame = 50;
    constructor(public worldData: World, public userData: UserDetails) {
        super(0);
        this.points = [
            new PointVector(10, 20),
            new PointVector(140, 80),
            new PointVector(290, 200),
            new PointVector(100, 420)
        ]
        this.x = userData.world.position.x;
        this.y = userData.world.position.y;
        this.width = userData.world.zoom
    }

    onProcess(): void {

        this.current = MathUtil.bezier(this.points, this.frame, this.currentFrame);
        this.currentFrame++;
        if (this.frame <= this.currentFrame + 1 ) {
            this.currentFrame = 0;
        }
        // console.log('this->', this.current, current);
    }

    move(x: number, y: number, zoom: number) {

    }


    public tileSpaceSize = 1;
    onDraws(canvasSet:CanvasSet): void {


        let tileWidthSize = this.width;
        const tileSize = canvasSet.canvas.width / tileWidthSize
        let tileHeightSize = canvasSet.canvas.height / tileSize;
        // console.log('-->', tileWidthSize, tileHeightSize, tileSize)
        tileWidthSize += this.tileSpaceSize;
        tileHeightSize += this.tileSpaceSize;

        const context = canvasSet.resetClearCanvas();
        // context.translate(-(tileSize / 2),-(tileSize / 2));
        // context.translate(this.x, this.y);
        context.lineWidth = 0.1;

        for (let y = 0; y < tileHeightSize; y++) {
            for (let x = 0; x < tileWidthSize; x++) {
                const x1 = (x * tileSize) - (tileSize / 2);
                const y1 = (y * tileSize) - (tileSize / 2);
                context.strokeRect(x1, y1, tileSize, tileSize);
            }
        }

        // context.translate()

        canvasSet.resetContext();
        this.points.forEach(it => {
            canvasSet.context.beginPath();
            canvasSet.context.arc(it.x, it.y, 5, 0, 2 * Math.PI);
            canvasSet.context.stroke();
        })

        if (this.current) {
            canvasSet.context.strokeStyle = '#000'
            canvasSet.context.beginPath();
            canvasSet.context.arc(this.current.x, this.current.y, 3, 0, 2 * Math.PI);
            canvasSet.context.stroke();
        }
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


    }
}
