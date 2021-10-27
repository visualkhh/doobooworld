import {PointVector} from "math/PointVector";
import { Obj } from 'objects/base/Obj';
import { Drawble } from 'draws/Drawble';
import { CanvasSet } from 'domains/CanvasSet';
import { EventTypes } from 'events/EventTypes';

export abstract class WorldObj extends Obj implements Drawble {
  abstract onTime(timestamp: number): void;
  abstract onDraw(canvasSet?: CanvasSet): void;
  public addEventListener(eventType: EventTypes) {

  }
}
