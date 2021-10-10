import { Drawble } from 'draws/Drawble';
import { Position } from 'domains/Position';
import { CanvasSet } from 'domains/CanvasSet';
import { Point } from 'math/Point';
import {Sim} from 'simple-boot-core/decorators/SimDecorator'
import { UserService } from 'services/UserService';
import { WorldManager } from 'manasgers/WorldManager';
import { UserDetails, World } from 'models/models';
import { filter } from 'rxjs';

@Sim()
export class Tile extends Point implements Drawble {

    tileSpaceSize = 0;
    // x = 0;
    // y = 0;
    private worldData?: World;
    private userData?: UserDetails;
    constructor(public worldManager: WorldManager, public userService: UserService) {
        super();
        worldManager.subject.subscribe(it => {
            this.worldData = it;
        })
        userService.subject.pipe(
            filter(it => it.use)
        ).subscribe(it => {
            this.userData = it;
        })
    }

    onDraw(canvasSet:CanvasSet): void {
        if (this.worldData && this.userData && canvasSet) {
            // calc
            let tileWidthSize = this.userData.world.tile.size;
            const tileSize = canvasSet.canvas.width / tileWidthSize
            let tileHeightSize = canvasSet.canvas.height / tileSize;
            console.log('-->', tileWidthSize, tileHeightSize, tileSize)
            tileWidthSize += this.tileSpaceSize;
            tileHeightSize += this.tileSpaceSize;

            const context = canvasSet.resetClearCanvas();
            // context.translate(-(tileSize / 2),-(tileSize / 2));
            // context.translate(this.x, this.y);
            context.lineWidth = 1;

            for (let y = 0; y < tileHeightSize; y++) {
                for (let x = 0; x < tileWidthSize; x++) {
                    context.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
                }
            }

            // this.x--;
            // this.y--;
        }


    }
}
