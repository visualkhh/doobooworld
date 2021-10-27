import { Drawble } from 'draws/Drawble';
import { Position } from 'domains/Position';
import { CanvasSet } from 'domains/CanvasSet';
import { Point } from 'math/Point';
import {Sim} from 'simple-boot-core/decorators/SimDecorator'
import { UserService } from 'services/UserService';
import { WorldManager } from 'manasgers/WorldManager';
import { UserDetails, World } from 'models/models';
import { delay, filter, interval, take } from 'rxjs';
import { WorldObj } from 'objects/base/WorldObj';
import { PointVector } from 'math/PointVector';
import { RandomUtil } from 'utils/RandomUtil';

@Sim()
export class Tile extends WorldObj {

    private worldData?: World;
    private userData?: UserDetails;
    constructor(public worldManager: WorldManager, public userService: UserService) {
        super();
        worldManager.subject.subscribe(it => this.worldData = it)
        userService.subject.subscribe(it => this.userData = it)
        // userService.subject.pipe(filter(it => it.use)).subscribe(it => this.userData = it)
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

        const frame = 30;
        const point12Step = PointVector.sub(point1, point2).div(frame);
        const point23Step = PointVector.sub(point2, point3).div(frame);
        const point34Step = PointVector.sub(point3, point4).div(frame);
        // const point12Step = new PointVector((point1.x - point2.x) / frame, (point1.y - point2.y) / frame);
        // const point23Step = new PointVector((point2.x - point3.x) / frame, (point2.y - point3.y) / frame);
        // const point34Step = new PointVector((point3.x - point4.x) / frame, (point3.y - point4.y) / frame);
        //
        interval(10).pipe(delay(500),take(frame)).subscribe(it => {
            point1.sub(point12Step);
            point2.sub(point23Step);
            point3.sub(point34Step);
            // point4.sub(point34Step); // 더이상갈곳없음

            const point12MoveStep = PointVector.sub(point1, point2).div(frame);
            const point23MoveStep = PointVector.sub(point2, point3).div(frame);
            // const point34MoveStep = PointVector.sub(point3, point4).div(frame); // 더이상갈곳없음

            const cnt = it + 1;
            const point12MovePoint = point12MoveStep.mult(cnt)
            const point23MovePoint = point23MoveStep.mult(cnt);
            const combinationPoint1MovePoint = PointVector.sub(point1, point12MovePoint); //new PointVector(point1.x - point12MovePoint.x, point1.y - point12MovePoint.y);
            const combinationPoint2MovePoint = PointVector.sub(point2, point23MovePoint); // new PointVector(point2.x - point23MovePoint.x, point2.y - point23MovePoint.y);

            const finalPointMoveStep =  PointVector.sub(combinationPoint1MovePoint, combinationPoint2MovePoint).div(frame);
            const finalPointMovePoint = finalPointMoveStep.mult(cnt);
            const final = PointVector.sub(combinationPoint1MovePoint, finalPointMovePoint);

            canvasSet.context.strokeStyle = '#000'
            canvasSet.context.beginPath();
            canvasSet.context.arc(final.x, final.y, 3, 0, 2 * Math.PI);
            canvasSet.context.stroke();


            canvasSet.context.strokeStyle = '#e3e3e3'
            canvasSet.context.beginPath();
            canvasSet.context.moveTo(point1.x,  point1.y);
            canvasSet.context.lineTo(point2.x,  point2.y);
            canvasSet.context.stroke();
            canvasSet.context.beginPath();
            canvasSet.context.moveTo(point2.x,  point2.y);
            canvasSet.context.lineTo(point3.x,  point3.y);
            canvasSet.context.stroke();
        });

        // if (this.worldData && this.userData && canvasSet) {
        //     // calc
        //     let tileWidthSize = this.userData.world.zoom;
        //     const tileSize = canvasSet.canvas.width / tileWidthSize
        //     let tileHeightSize = canvasSet.canvas.height / tileSize;
        //     console.log('-->', tileWidthSize, tileHeightSize, tileSize)
        //     // tileWidthSize += this.tileSpaceSize;
        //     // tileHeightSize += this.tileSpaceSize;
        //
        //     const context = canvasSet.resetClearCanvas();
        //     // context.translate(-(tileSize / 2),-(tileSize / 2));
        //     // context.translate(this.x, this.y);
        //     context.lineWidth = 1;
        //
        //     for (let y = 0; y < tileHeightSize; y++) {
        //         for (let x = 0; x < tileWidthSize; x++) {
        //             context.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
        //         }
        //     }
        //
        //     // this.x--;
        //     // this.y--;
        // }


    }
}
