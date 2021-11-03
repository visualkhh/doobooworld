import {PointVector} from "math/PointVector";
import { Obj } from 'objects/base/Obj';
import { Drawble } from 'draws/Drawble';
import { CanvasSet } from 'domains/CanvasSet';
import { EventTypes } from '../../events/EventTypes';
import { MathUtil } from '../../utils/MathUtil';
import { SimGlobal } from 'simple-boot-core/global/SimGlobal';
import { SimstanceManager } from 'simple-boot-core/simstance/SimstanceManager';
import { Point } from '../../math/Point';
// import { ResourceManager } from '../../manasgers/ResourceManager';
// import { WorldManager } from '../../manasgers/WorldManager';
// import { ObjectsManager } from '../../manasgers/ObjectsManager';
// import { UserService } from '../../services/UserService';

export abstract class WorldObj extends Obj implements Drawble {
  private _tick = 0;
  constructor(public pbf: number = 0) {
    super();
  }

  // get simstanceManager(): SimstanceManager {
  //   return (SimGlobal().application.simstanceManager as SimstanceManager);
  // }
  // //
  // get resourceManager(): ResourceManager | undefined {
  //   return this.simstanceManager.getOrNewSim(ResourceManager)
  // }
  //
  // get worldManager(): WorldManager | undefined {
  //   return this.simstanceManager.getOrNewSim(WorldManager)
  // }
  //
  // get userService(): UserService | undefined {
  //   return this.simstanceManager.getOrNewSim(UserService)
  // }
  //
  // get objectsManager(): ObjectsManager | undefined {
  //   return this.simstanceManager.getOrNewSim(ObjectsManager)
  // }

  animationFrameWorkable(timestamp: number): void {
    if (this.pbf <= 0 || this._tick % this.pbf === 0) {
      this._tick = 0;
      if (this.isWorkable()) {
        this.animationFrame(timestamp);
      }
    }
    this._tick++;
  };

  abstract animationFrame(timestamp: number): void;


  onDrawWrokable(canvasSet?: CanvasSet): boolean {
    canvasSet?.resetContext();
    const b = this.isWorkable();
    if (b) {
      this.onDraw(canvasSet);
    }
    return b;
  }
  abstract onDraw(canvasSet?: CanvasSet): void;


  abstract isWorkable(): boolean;

  isIncludePoint(point: Point) {
    return (
        this.x <= point.x &&
        this.x + this.w >= point.x &&
        this.y <= point.y &&
        this.y + this.h >= point.y
    );
  }

  // public addEventListener(eventType: EventTypes) {
  // }
  public click(point: PointVector, event: MouseEvent | TouchEvent): boolean {
    return false;
  }

  mouseDown(point: PointVector, event: MouseEvent | TouchEvent): boolean {
    console.log('down')
    return false;
  }

  mouseUp(point: PointVector, event: MouseEvent | TouchEvent): boolean {
    console.log('up')
    return false;
  }

  keyDown(event: KeyboardEvent): boolean {
    console.log('k down')
    return false;
  }

  keyUp(event: KeyboardEvent): boolean {
    console.log('k up')
    return false;
  }
}
