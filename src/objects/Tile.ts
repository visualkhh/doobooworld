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

    constructor(public worldData: World, public userData: UserDetails) {
        super();
    }

    onTime(timestamp: number): void {
        // console.log('--------', timestamp)
    }

    move(x: number, y: number, zoom: number) {

    }


    onDraw(canvasSet:CanvasSet): void {


        const point1 = new PointVector(RandomUtil.random(10, canvasSet.width), RandomUtil.random(10, canvasSet.height));
        const point2 = new PointVector(RandomUtil.random(10, canvasSet.width), RandomUtil.random(10, canvasSet.height));
        const point3 = new PointVector(RandomUtil.random(10, canvasSet.width), RandomUtil.random(10, canvasSet.height));
        const point4 = new PointVector(RandomUtil.random(10, canvasSet.width), RandomUtil.random(10, canvasSet.height));

        canvasSet.context.beginPath();
        canvasSet.context.arc(point1.x, point1.y, 5, 0, 2 * Math.PI);
        canvasSet.context.stroke();
        canvasSet.context.beginPath();
        canvasSet.context.arc(point2.x, point2.y, 5, 0, 2 * Math.PI);
        canvasSet.context.stroke();
        canvasSet.context.beginPath();
        canvasSet.context.arc(point3.x, point3.y, 5, 0, 2 * Math.PI);
        canvasSet.context.stroke();
        canvasSet.context.beginPath();
        canvasSet.context.arc(point4.x, point4.y, 5, 0, 2 * Math.PI);
        canvasSet.context.stroke();

        const point = {point1, point2, point3, point4};
        // console.log('ppoo', point)
        const pointVectors = new Array(30).fill(undefined);
        for (let i = 0; i < pointVectors.length; i++) {
            pointVectors[i] = MathUtil.bezier(point, 30, i);
        }
        // console.log('ppoo2', point)
        const pointVectors2 = MathUtil.beziers(point, 30);

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
