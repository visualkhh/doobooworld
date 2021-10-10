import {PointVector} from "../math/PointVector";

export class Obj extends PointVector {

  //질량
  private _mass = 0;

  get mass(): number {
    return this._mass;
  }

  set mass(value: number) {
    this._mass = value;
  }
}
