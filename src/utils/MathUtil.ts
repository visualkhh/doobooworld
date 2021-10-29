import { PointVector } from 'math/PointVector';
import { RandomUtil } from 'utils/RandomUtil';
import { Point } from 'math/Point';
import { interval, take } from 'rxjs';

export class MathUtil {
    static getMinByObjectArray(objectArray: Array<any>, varName: string) {
        let min;
        if (varName && objectArray && objectArray.length > 0) {
            min = objectArray[0][varName];
            for (let i = 1; i < objectArray.length; i++) {
                min = Math.min(min, objectArray[i][varName]);
            }
        }
        return min;
    }

    static getMaxByObjectArray(objectArray: Array<any>, varName: string) {
        let max;
        if (varName && objectArray && objectArray.length > 0) {
            max = objectArray[0][varName];
            for (let i = 1; i < objectArray.length; i++) {
                max = Math.max(max, objectArray[i][varName]);
            }
        }
        return max;
    }

    static getSumByObjectArray(objectArray: Array<any>, varName: string) {
        let sum = 0;
        if (varName && objectArray && objectArray.length > 0) {
            for (let i = 0; i < objectArray.length; i++) {
                sum += objectArray[i][varName];
            }
        }
        return sum;
    }
    static radians(aAngle: number): number {
        return aAngle / 180 * Math.PI;
    }

    // static createCanvas(w, h) {
    //     let canvas = document.createElement('canvas');
    //     canvas.width = w;
    //     canvas.height = h;
    //     return canvas;
    // }
    //
    // static copyCanvas(canvas) {
    //     let newCanvas = document.createElement('canvas');
    //     newCanvas.width = canvas.width;
    //     newCanvas.height = canvas.height;
    //     context = newCanvas.getContext('2d');
    //     context.drawImage(canvas, 0, 0);
    //     return newCanvas;
    // }

    //end - start    끝과 시작의 사이길이를 취득한다.
    static getBetweenLength(start: number, end: number) {
        return end - start;
    }

    //전체값에서 일부값은 몇 퍼센트? 계산법 공식    tot에서  data는 몇%인가.
    static getPercentByTot(tot: number, data: number) {
        /*
        전체값에서 일부값은 몇 퍼센트? 계산법 공식
        일부값 ÷ 전체값 X 100
        예제) 300에서 105는 몇퍼센트?
        답: 35%
        */
        return (data / tot) * 100;
    }

    //전체값의 몇 퍼센트는 얼마? 계산법 공식    tot에서  wantPercent는 몇인가?
    static getValueByTotInPercent(tot: number, wantPercent: number) {
        /*
        전체값 X 퍼센트 ÷ 100
        예제) 300의 35퍼센트는 얼마?
        답) 105
         */
        return (tot * wantPercent) / 100;
    }

    //숫자를 몇 퍼센트 증가시키는 공식    tot에서  wantPercent을 증가 시킨다
    static getValuePercentUp(tot: number, wantPercent: number) {
        /*
        숫자를 몇 퍼센트 증가시키는 공식
        숫자 X (1 + 퍼센트 ÷ 100)
        예제) 1548을 66퍼센트 증가하면?
        답) 2569.68
         */
        return tot * (1 + wantPercent / 100);
    }

    //숫자를 몇 퍼센트 감소하는 공식    tot에서  wantPercent을 증감 시킨다
    static getValuePercentDown(tot: number, wantPercent: number) {
        /*
        숫자를 몇 퍼센트 감소하는 공식
        숫자 X (1 - 퍼센트 ÷ 100)
        예제) 1548을 66퍼센트 감소하면?
        답) 526.32
         */
        return tot * (1 - wantPercent / 100);
    }

    //바례식
    // A:B = C:X    => 30:50 = 33 : x
    // 30X = 50*33
    // X = BC / 30






    // Bezier
    static bezier(points: Point[], frame: number, idx: number): PointVector {
        const pv = points.map(it => new PointVector(it.x, it.y, it.z))
        const steps: PointVector[] = [];
        pv.reduce((a, b) => {
            const step = PointVector.sub(a, b).div(frame).mult(idx + 1);
            steps.push(PointVector.sub(a, step));
            return b;
        });

        if (steps.length <= 1) {
            return steps[0];
        }
        return MathUtil.bezier(steps, frame, idx);
    }
    // static bezirePointToPointVector(point: {point1: Point, point2?: Point, point3?: Point, point4?: Point}) {
    //     if (!point.point2) {
    //         point.point2 = point.point1;
    //     }
    //     if (!point.point3) {
    //         point.point3 = point.point2;
    //     }
    //     if (!point.point4) {
    //         point.point4 = point.point3;
    //     }
    //     return {
    //         point1: new PointVector(point.point1.x, point.point1.y, point.point1.z),
    //         point2: new PointVector(point.point2.x, point.point2.y, point.point2.z),
    //         point3: new PointVector(point.point3.x, point.point3.y, point.point3.z),
    //         point4: new PointVector(point.point4.x, point.point4.y, point.point4.z),
    //     }
    // }
    // static bezier(point: {point1: Point, point2?: Point, point3?: Point, point4?: Point}, frame: number, idx: number) {
    //     const pointVector = MathUtil.bezirePointToPointVector(point);
    //
    //     const point12Step = PointVector.sub(pointVector.point1, pointVector.point2).div(frame).mult(idx + 1);
    //     const point23Step = PointVector.sub(pointVector.point2, pointVector.point3).div(frame).mult(idx + 1);
    //     const point34Step = PointVector.sub(pointVector.point3, pointVector.point4).div(frame).mult(idx + 1);
    //
    //     pointVector.point1.sub(point12Step);
    //     pointVector.point2.sub(point23Step);
    //     pointVector.point3.sub(point34Step);
    //
    //     const point12MoveStep = PointVector.sub(pointVector.point1, pointVector.point2).div(frame);
    //     const point23MoveStep = PointVector.sub(pointVector.point2, pointVector.point3).div(frame);
    //     // const point34MoveStep = PointVector.sub(point3, point4).div(frame); // 더이상갈곳없음
    //
    //     const cnt = idx + 1;
    //     const point12MovePoint = point12MoveStep.mult(cnt)
    //     const point23MovePoint = point23MoveStep.mult(cnt);
    //     const combinationPoint1MovePoint = PointVector.sub(pointVector.point1, point12MovePoint); //new PointVector(point1.x - point12MovePoint.x, point1.y - point12MovePoint.y);
    //     const combinationPoint2MovePoint = PointVector.sub(pointVector.point2, point23MovePoint); // new PointVector(point2.x - point23MovePoint.x, point2.y - point23MovePoint.y);
    //
    //     const finalPointMoveStep =  PointVector.sub(combinationPoint1MovePoint, combinationPoint2MovePoint).div(frame);
    //     const finalPointMovePoint = finalPointMoveStep.mult(cnt);
    //     const final = PointVector.sub(combinationPoint1MovePoint, finalPointMovePoint);
    //     return final;
    // }
    //
    // static beziers(point: {point1: Point, point2?: Point, point3?: Point, point4?: Point}, frame: number) {
    //     const pointVector = MathUtil.bezirePointToPointVector(point);
    //     const frames = new Array(frame).fill(undefined) as PointVector[];
    //     for (let i = 0; i < frame; i++) {
    //         frames[i] = MathUtil.bezier(point, frame, i);
    //         // pointVector.point1.sub(point12Step);
    //         // pointVector.point2.sub(point23Step);
    //         // pointVector.point3.sub(point34Step);
    //         //
    //         // const point12MoveStep = PointVector.sub(pointVector.point1, pointVector.point2).div(frame);
    //         // const point23MoveStep = PointVector.sub(pointVector.point2, pointVector.point3).div(frame);
    //         // // const point34MoveStep = PointVector.sub(point3, point4).div(frame); // 더이상갈곳없음
    //         //
    //         // const cnt = i + 1;
    //         // const point12MovePoint = point12MoveStep.mult(cnt)
    //         // const point23MovePoint = point23MoveStep.mult(cnt);
    //         // const combinationPoint1MovePoint = PointVector.sub(pointVector.point1, point12MovePoint); //new PointVector(point1.x - point12MovePoint.x, point1.y - point12MovePoint.y);
    //         // const combinationPoint2MovePoint = PointVector.sub(pointVector.point2, point23MovePoint); // new PointVector(point2.x - point23MovePoint.x, point2.y - point23MovePoint.y);
    //         //
    //         // const finalPointMoveStep =  PointVector.sub(combinationPoint1MovePoint, combinationPoint2MovePoint).div(frame);
    //         // const finalPointMovePoint = finalPointMoveStep.mult(cnt);
    //         // const final = PointVector.sub(combinationPoint1MovePoint, finalPointMovePoint);
    //     }
    //     return frames;
    // }

}
