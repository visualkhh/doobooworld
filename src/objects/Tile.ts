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

    point: {
        point1: PointVector,
        point2: PointVector,
        point3: PointVector,
        point4: PointVector
    }

    current?: PointVector;
    currentFrame = 0;
    frame = 30;
    constructor(public worldData: World, public userData: UserDetails) {
        super(2);
        this.point = {
            point1: new PointVector(10, 20),
            point2: new PointVector(140, 80),
            point3: new PointVector(290, 200),
            point4: new PointVector(100, 420)
        }
        this.x = userData.world.position.x;
        this.y = userData.world.position.y;
        this.width = userData.world.zoom
    }

    onProcess(): void {
        if (this.frame <= this.currentFrame) {
            this.currentFrame = 0;
        }
        this.current = MathUtil.bezier(this.point, this.frame, this.currentFrame++);
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
        context.lineWidth = 1;

        for (let y = 0; y < tileHeightSize; y++) {
            for (let x = 0; x < tileWidthSize; x++) {
                const x1 = (x * tileSize) - (tileSize / 2);
                const y1 = (y * tileSize) - (tileSize / 2);
                context.strokeRect(x1, y1, tileSize, tileSize);
            }
        }

        // context.translate()



        // canvasSet.context.beginPath();
        // canvasSet.context.arc(this.point.point1.x, this.point.point1.y, 5, 0, 2 * Math.PI);
        // canvasSet.context.stroke();
        // canvasSet.context.beginPath();
        // canvasSet.context.arc(this.point.point2.x, this.point.point2.y, 5, 0, 2 * Math.PI);
        // canvasSet.context.stroke();
        // canvasSet.context.beginPath();
        // canvasSet.context.arc(this.point.point3.x, this.point.point3.y, 5, 0, 2 * Math.PI);
        // canvasSet.context.stroke();
        // canvasSet.context.beginPath();
        // canvasSet.context.arc(this.point.point4.x, this.point.point4.y, 5, 0, 2 * Math.PI);
        // canvasSet.context.stroke();
        //
        // if (this.current) {
        //     canvasSet.context.strokeStyle = '#000'
        //     canvasSet.context.beginPath();
        //     canvasSet.context.arc(this.current.x, this.current.y, 3, 0, 2 * Math.PI);
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


    }
}
