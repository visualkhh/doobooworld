import {PointVector} from "math/PointVector";

export class Obj extends PointVector {

  // 질량
  private _mass = 0;
  // 가로
  private _width = 0;
  // 세로
  private _height = 0;
  // 높이
  private _depth = 0;

  get mass(): number {
    return this._mass;
  }

  set mass(value: number) {
    this._mass = value;
  }

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
  }

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
  }

  get depth(): number {
    return this._depth;
  }

  set depth(value: number) {
    this._depth = value;
  }
}
