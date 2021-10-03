import { SimFrontOption } from 'simple-boot-front/option/SimFrontOption';
import { SimpleBootFront } from 'simple-boot-front/SimpleBootFront';
import { Sim } from 'simple-boot-core/decorators/SimDecorator';
import { Component } from 'simple-boot-front/decorators/Component';
import template from './index.html'
import style from './index.css'
import { WorldManager } from 'manasgers/WorldManager';
import { World } from 'models/models';

@Sim()
@Component({template, styles: [style]})
export class Index {
    private canvas?: HTMLCanvasElement;
    public world?: World;
    constructor(public worldManager: WorldManager) {
        this.worldManager.getWorld().then(it => this.world = it);
    }

    onInitCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.worldManager.drawInterval(this.onDraw, this);
    }

    onDraw() {
        if (this.world) {
            console.log('draw')
        }
        // console.log('draw')
    }

}

new SimpleBootFront(Index, new SimFrontOption(window)).run();
