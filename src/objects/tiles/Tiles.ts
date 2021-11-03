import { Tile } from 'objects/tiles/Tile';
import { Point } from 'math/Point';
import { WorldObj } from 'objects/base/WorldObj';
import { PointVector } from 'math/PointVector';
export class TilesConfig {
    displayStart = new PointVector();
    displayEnd = new PointVector();
    zoom = 0;
    getTileVolumePx(){
        return (this.displayEnd.x - this.displayStart.x) / this.zoom;
    }
    set(start: PointVector, end: PointVector, zoom: number){
        this.displayStart = start;
        this.displayEnd = end;
        this.zoom = zoom;
    }
}
export class Tiles {
    public tils: Tile[][];
    public config = new TilesConfig()
    constructor(public w: number, public h: number) {
        this.tils = Array.from(Array(h), () => Array(w).fill(undefined))
    }


    private process() {

    }

    getTileByPx(point: PointVector) {
        for (const canDrawTile of this.canDrawTiles()) {
            for (const tile of canDrawTile) {
                if(tile.isIncludePoint(point)){
                    return tile;
                }
            }
        }
    }

    getTileByIdx(xIdx: number, yIdx: number): Tile {
        return this.tils[yIdx][xIdx];
    }

    canDrawTiles() {
        const r: Tile[][] = [];
        this.tils.forEach(it => {
            r. push(it.filter(sit => {
                return sit.canDraw(this.config)
            }))
        })
        return r;
    }

    public setPosition(xIdx: number, yIdx: number, goPx: Point) {
        const startX = goPx.x - (this.config.getTileVolumePx() / 2) - (this.config.getTileVolumePx() * xIdx)
        const startY = goPx.y - (this.config.getTileVolumePx() / 2) - (this.config.getTileVolumePx() * yIdx)
        for (let y = 0; y < this.tils.length; y++) {
            for (let x = 0; x < this.tils[y].length; x++) {
                const tile = this.tils[y][x] = this.tils[y][x] ?? new Tile(this.config);
                tile.xIdx = x;
                tile.yIdx = y;
                tile.w = this.config.getTileVolumePx();
                tile.h = this.config.getTileVolumePx();
                tile.x = startX + (tile.w * x);
                tile.y = startY + (tile.h * y);
            }
        }
        return this;
    }
}
