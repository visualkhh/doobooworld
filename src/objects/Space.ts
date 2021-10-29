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
import { Tile } from 'objects/tiles/Tile';
import { Tiles } from 'objects/tiles/Tiles';

export class Space extends WorldObj {
    tils: Tiles;
    points: PointVector[] = [];
    current = new PointVector();
    currentFrame = 0;
    frame = 50;
    constructor(public worldData: World, public userData: UserDetails) {
        super(0);
        this.points = []
        this.x = userData.world.position.x;
        this.y = userData.world.position.y;
        this.w = userData.world.zoom;
       this.tils = new Tiles(worldData.w, worldData.h);
        // console.log('-->', this.tils)
    }

    onProcess(): void {

        this.current = MathUtil.bezier(this.points, this.frame, this.currentFrame);
        this.currentFrame++;
        if (this.frame <= this.currentFrame + 1 ) {
            this.currentFrame = 0;
        }
        // console.log('this->', this.current, current);
    }

    up() {
        const start = this.tils.getTile(this.x, this.y);
        const end = this.tils.getTile(this.x, this.y - 1);
        this.points = [start, start.get().sub(start.w, start.w / 2, 0), end]
        // this.x = x;
        // this.y = y;
    }
    down() {
        const start = this.tils.getTile(this.x, this.y);
        const end = this.tils.getTile(this.x, this.y + 1);
        this.points = [start, start.get().add(start.w, start.w / 2, 0), end]
    }
    move(x: number, y: number) {
        // const start = this.tils.getTile(this.x, this.y);
        // const end = this.tils.getTile(x, y);
        // this.points = [start, start.get().add(start.w, start.w / 2, 0), end]
        // this.x = x;
        // this.y = y;
    }


    public tileSpaceSize = 1;
    onDraws(canvasSet:CanvasSet): void {
        const tileSize = canvasSet.canvas.width / this.w
        this.tils.config = {w: tileSize, h: tileSize};


        const context = canvasSet.context;
        context.lineWidth = 0.5;
        context.textAlign = "left";
        context.textBaseline = "top";
        context.font = '10px malgun gothic';
        // const tils1 = this.tils.setPosition(this.x, this.y, canvasSet.getCenter()).tils;
        // console.log(this.x, this.y, '--- ')
        this.tils.setPosition(this.x, this.y, canvasSet.getCenter()).visibleTile({w: canvasSet.width, h: canvasSet.height}).forEach(it => {
            it.forEach(sit => {
                context.fillText(`${sit.xIdx}, ${sit.yIdx}`, sit.x, sit.y);
                context.strokeRect(sit.x, sit.y, sit.w, sit.h);
            })
        });
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

        canvasSet.resetContext();
        context.strokeStyle = '#f00'
        this.points.forEach(it => {
            canvasSet.context.beginPath();
            canvasSet.context.arc(it.x, it.y, 5, 0, 2 * Math.PI);
            canvasSet.context.stroke();
        })
        //
        if (this.current) {
            canvasSet.context.strokeStyle = '#00f'
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
