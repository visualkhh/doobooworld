import { Tile } from 'objects/tiles/Tile';
import { Point } from 'math/Point';
import { WorldObj } from 'objects/base/WorldObj';

export class Tiles {
    public tils: Tile[][];

    constructor(public w: number, public h: number, private _config: {w: number, h: number} = {w:0, h:w}, private objects: WorldObj[]) {
        this.tils = Array.from(Array(h), () => Array(w).fill(undefined))
    }


    get config(): { w: number; h: number } {
        return this._config;
    }

    set config(value: { w: number; h: number }) {
        this._config = value;
        this.process();
    }

    private process() {

    }

    getTile(xIdx: number, yIdx: number): Tile {
        return this.tils[yIdx][xIdx];
    }

    visibleTile({w, h}: {w: number, h: number}) {
        const r: Tile[][] = [];
        this.tils.forEach(it => {
            r. push(it.filter(sit => {
                const endX = sit.x + sit.w;
                const endY = sit.y + sit.h;
                return  ((sit.x >= 0  && sit.x <= w) || (endX >= 0  && endX <= w)) &&
                    ((sit.y >= 0  && sit.y <= h) || (endY >= 0  && endY <= h))
            }))
        })
        return r;
    }

    public setPosition(xIdx: number, yIdx: number, goPx: Point) {
        const startX = goPx.x - (this.config.w / 2) - (this.config.w * xIdx)
        const startY = goPx.y - (this.config.h / 2) - (this.config.h * yIdx)
        for (let y = 0; y < this.tils.length; y++) {
            for (let x = 0; x < this.tils[y].length; x++) {
                const tile = this.tils[y][x] = this.tils[y][x] ?? new Tile();
                tile.xIdx = x;
                tile.yIdx = y;
                tile.w = this.config.w;
                tile.h = this.config.h;
                tile.x = startX + (tile.w * x);
                tile.y = startY + (tile.h * y);
                // if (x === xIdx && y === yIdx) {
                //     console.log('--->', xIdx, yIdx, x, y, tile)
                // }
            }
        }
        return this;
    }
}
