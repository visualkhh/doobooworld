import {PointVector} from "math/PointVector";
import { Obj } from 'objects/base/Obj';
import { Drawble } from 'draws/Drawble';
import { CanvasSet } from 'domains/CanvasSet';
import { EventTypes } from 'events/EventTypes';
import { MathUtil } from 'utils/MathUtil';

export abstract class WorldObj extends Obj implements Drawble {
  private _tick = 0;
  constructor(public pbf: number = 0) {
    super();
  }

  animationFrame(timestamp: number): void {
    if (this.pbf <= 0 || this._tick % this.pbf === 0) {
      this._tick = 0;
      this.onProcess();
    }
    this._tick++;
  };

  abstract onProcess(): void;

  onDraw(canvasSet?: CanvasSet): void {
    canvasSet?.resetContext();
    this.onDraws(canvasSet);
  };

  abstract onDraws(canvasSet?: CanvasSet): void;
  public addEventListener(eventType: EventTypes) {

  }
  public click(point: PointVector, event: MouseEvent) {

  }
}
