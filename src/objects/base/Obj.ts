import {PointVector} from "math/PointVector";

export class Obj extends PointVector {

  // 질량
  private _m = 0;
  // 가로
  private _w = 0;
  // // 세로
  private _h = 0;
  // // 높이
  // private _d = 0;

  get m(): number {
    return this._m;
  }

  set m(value: number) {
    this._m = value;
  }

  get w(): number {
    return this._w;
  }

  set w(value: number) {
    this._w = value;
  }

  get h(): number {
    return this._h;
  }

  set h(value: number) {
    this._h = value;
  }
  //
  // get d(): number {
  //   return this._d;
  // }
  //
  // set d(value: number) {
  //   this._d = value;
  // }
}
