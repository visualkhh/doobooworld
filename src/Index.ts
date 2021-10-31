import { SimFrontOption } from 'simple-boot-front/option/SimFrontOption';
import { SimpleBootFront } from 'simple-boot-front/SimpleBootFront';
import { Sim } from 'simple-boot-core/decorators/SimDecorator';
import { Component } from 'simple-boot-front/decorators/Component';
import template from './index.html'
import style from './index.css'
import { WorldManager } from 'manasgers/WorldManager';
import { SimstanceManager } from 'simple-boot-core/simstance/SimstanceManager';
import { UserService } from 'services/UserService';
import { DomRenderProxy } from 'dom-render/DomRenderProxy';
import { OnInitRender } from 'dom-render/lifecycle/OnInitRender';
import { BehaviorSubject, filter, from, Subject, zip } from 'rxjs';
import { Drawble } from 'draws/Drawble';
import { Space } from 'objects/Space';
import { Position } from 'domains/Position';
import { CanvasSet } from 'domains/CanvasSet';
import { OnInit } from 'simple-boot-front/lifecycle/OnInit';
import { UserDetailsData, WorldData } from 'models/models';
import { Debug } from 'objects/Debug';
import { WorldObj } from 'objects/base/WorldObj';
import { PTDB } from 'objects/PTDB';

@Sim()
@Component({template, styles: [style]})
export class Index implements Drawble, OnInit {
    canvasSet?: CanvasSet;
    canvasContainer?: HTMLDivElement;
    private worldData?: WorldData;
    private userData?: UserDetailsData;
    private objects: WorldObj[] = [];
    private space?: Space;
    private debug = new Debug();
    constructor(public worldManager: WorldManager, public userService: UserService, public simstanceManager: SimstanceManager) {
        // worldManager.subject.subscribe(it => this.worldData = it);
        // userService.subject.subscribe(it => this.userData = it);
        zip(this.worldManager.subject.pipe(filter(it => it.use)), this.userService.subject.pipe(filter(it => it.use))).subscribe(it => {
            this.worldData = it[0]
            this.userData = it[1];
            this.space = new Space(this.worldData, this.userData, this.objects);
            this.worldData?.objects.forEach(it => {
                if (it.type === 'ptdb') {
                    this.objects.push(new PTDB(DomRenderProxy.final(this.space)!, it))
                }
            })
        })
    }

    onInit(): void {
        window.addEventListener('resize', ev => {
            this.resizeCanvase();
        });
    }

    onInitCanvas(canvas: HTMLCanvasElement) {
        this.canvasSet = new CanvasSet(canvas);
        this.resizeCanvase();
        this.onDraw();
        this.worldManager.drawInterval({animationFrame: this.animationFrame.bind(this), draw: this.onDraw.bind(this)});
    }

    resizeCanvase() {
        if (this.canvasSet && this.canvasContainer) {
            this.canvasSet.width = this.canvasContainer.clientWidth;
            this.canvasSet.height = this.canvasContainer.clientHeight;
        }
    }

    onInitCanvasContainer(container: HTMLDivElement) {
        this.canvasContainer = container;
    }


    animationFrame(timestemp: number) {
        this.space?.animationFrame(timestemp);
        this.objects.forEach(it => it.animationFrame(timestemp));
    }

    onDraw() {
        if (this.canvasSet) {
            this.canvasSet.clearCanvas();
            // const context = this.canvasSet.clearResetCanvas();
            // context.strokeRect(25, 25, 100, 100);
            if (this.space) {
                this.space.onDraw(this.canvasSet);
                this.objects.forEach(it => it.onDraw(this.canvasSet));
            } else {
                // loading...
            }
            // this.objects.forEach(it => it.onDraw())
            // context.fillRect(25, 25, 100, 100);

            this.debug
            this.debug.onDraw(this.canvasSet);
        }
        // console.log('draw')
    }

}

const simpleBootFront = new SimpleBootFront(Index, new SimFrontOption(window));
simpleBootFront.domRendoerExcludeProxy.push(CanvasRenderingContext2D, Subject)
simpleBootFront.run();
