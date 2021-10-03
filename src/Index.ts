import { SimFrontOption } from 'simple-boot-front/option/SimFrontOption';
import { SimpleBootFront } from 'simple-boot-front/SimpleBootFront';
import { Sim } from 'simple-boot-core/decorators/SimDecorator';
import { Component } from 'simple-boot-front/decorators/Component';
import template from './index.html'
import style from './index.css'
import { WorldManager } from 'manasgers/WorldManager';
import { World } from 'models/models';
import { UserService } from 'services/UserService';
import { LifeCycle } from 'simple-boot-core/cycles/LifeCycle';
import { DomRenderProxy } from 'dom-render/DomRenderProxy';

@Sim()
@Component({template, styles: [style]})
export class Index implements LifeCycle {
    public data: {canvas?: HTMLCanvasElement} = DomRenderProxy.final({});
    public world?: World;
    constructor(public worldManager: WorldManager, public userService: UserService) {
        this.worldManager.getWorld().then(it => this.world = it);
        this.userService.subject.subscribe(it => {
            console.log(it);
        })
    }

    onCreate(): void {
        window.addEventListener('resize', ev => {
            if (this.data.canvas) {
                let target = ev.target as Window;
                this.data.canvas.width = target.innerWidth;
                this.data.canvas.height = target.innerHeight;
            }
        });
        window.dispatchEvent(new Event('resize'));
    }

    onInitCanvas(canvas: HTMLCanvasElement) {
        this.data.canvas = canvas;
        this.worldManager.drawInterval(this.onDraw, this);
    }


    onDraw() {
        if (this.world && this.data.canvas) {
            let context = this.data.canvas.getContext('2d')!;
            context.fillRect(25, 25, 100, 100);
        }
        // console.log('draw')
    }

}

new SimpleBootFront(Index, new SimFrontOption(window)).run();
