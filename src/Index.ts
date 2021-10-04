import { SimFrontOption } from 'simple-boot-front/option/SimFrontOption';
import { SimpleBootFront } from 'simple-boot-front/SimpleBootFront';
import { Sim } from 'simple-boot-core/decorators/SimDecorator';
import { Component } from 'simple-boot-front/decorators/Component';
import template from './index.html'
import style from './index.css'
import { WorldManager } from 'manasgers/WorldManager';
import { UserDetails, World } from 'models/models';
import { UserService } from 'services/UserService';
import { LifeCycle } from 'simple-boot-core/cycles/LifeCycle';
import { DomRenderProxy } from 'dom-render/DomRenderProxy';
import { from } from 'rxjs';
import { Drawble } from 'draws/Drawble';
import { Tile } from 'objects/Tile';
import { Position } from 'domains/Position';
import { CanvasSet } from 'domains/CanvasSet';

@Sim()
@Component({template, styles: [style]})
export class Index extends Drawble implements LifeCycle {
    canvasSet?: CanvasSet;
    canvasContainer?: HTMLDivElement;

    objects: Drawble[] = [];

    public world?: World;
    private userDetails?: UserDetails;
    private context?: CanvasRenderingContext2D | null;
    constructor(public worldManager: WorldManager, public userService: UserService) {
        super();
        from(this.worldManager.getWorld()).subscribe(it => this.world = it);
    }

    onCreate(): void {
        window.addEventListener('resize', ev => {
            if (this.canvasSet && this.canvasContainer) {
                this.canvasSet.width = this.canvasContainer.clientWidth;
                this.canvasSet.height = this.canvasContainer.clientHeight;
            }
        });
    }

    onInitCanvas(canvas: HTMLCanvasElement) {
        this.canvasSet = new CanvasSet(canvas);
        this.userService.subject.subscribe(it => {
            this.userDetails = it;
            this.objects.push(new Tile(this.canvasSet!, new Position(this.userDetails.world.center.x, this.userDetails.world.center.y), this.userDetails!.world.tile.size));
        })
        window.dispatchEvent(new Event('resize'));
        this.worldManager.drawInterval(this.onDraw, this);
    }

    onInitCanvasContainer(container: HTMLDivElement) {
        this.canvasContainer = container;
    }


    onDraw() {
        if (this.world && this.canvasSet && this.userDetails) {
            this.canvasSet.clearCanvas();
            // const context = this.canvasSet.clearResetCanvas();
            // context.strokeRect(25, 25, 100, 100);

            this.objects.forEach(it => it.onDraw())
            // context.fillRect(25, 25, 100, 100);
        }
        // console.log('draw')
    }

}

const simpleBootFront = new SimpleBootFront(Index, new SimFrontOption(window));
simpleBootFront.domRendoerExcludeProxy.push(CanvasRenderingContext2D)
simpleBootFront.run();
