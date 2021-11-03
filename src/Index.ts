import { SimFrontOption } from 'simple-boot-front/option/SimFrontOption';
import { SimpleBootFront } from 'simple-boot-front/SimpleBootFront';
import { Sim } from 'simple-boot-core/decorators/SimDecorator';
import { Component } from 'simple-boot-front/decorators/Component';
import template from './index.html'
import style from './index.css'
import { WorldManager } from 'manasgers/WorldManager';
import { SimstanceManager } from 'simple-boot-core/simstance/SimstanceManager';
import { Subject } from 'rxjs';
import { Drawble } from 'draws/Drawble';
import { Space } from 'objects/Space';
import { CanvasSet } from 'domains/CanvasSet';
import { OnInit } from 'simple-boot-front/lifecycle/OnInit';
import { Debug } from 'objects/Debug';
import { PointVector } from 'math/PointVector';
import { Controller } from 'objects/controller/Controller';
import { Me } from 'objects/Me';
import { ObjectsManager } from 'manasgers/ObjectsManager';
import { ResourceManager } from 'manasgers/ResourceManager';
import { WorldObj } from 'objects/base/WorldObj';

@Sim()
@Component({template, styles: [style]})
export class Index implements Drawble, OnInit {
    canvasSet?: CanvasSet;
    canvasContainer?: HTMLDivElement;
    private debug = new Debug();

    constructor(private worldManager: WorldManager, private simstanceManager: SimstanceManager, private objectManager: ObjectsManager,
                private space: Space,
                private me: Me,
                private controller: Controller,
    ) {
    }

    onInit(): void {
        window.addEventListener('resize', ev => {
            this.resizeCanvase();
        });
    }

    onInitCanvas(canvas: HTMLCanvasElement) {
        this.canvasSet = new CanvasSet(canvas);
        canvas.addEventListener('click', (e: MouseEvent) => this.click(e));
        canvas.addEventListener('mousedown', (e: MouseEvent) => this.mouseDown(e));
        canvas.addEventListener('mouseup', (e: MouseEvent) => this.mouseUp(e));
        window.addEventListener('keydown', (e: KeyboardEvent) => this.keyDown(e));
        window.addEventListener('keyup', (e: KeyboardEvent) => this.keyUp(e));
        canvas.addEventListener('touchstart', (e: TouchEvent) => this.mouseDown(e));
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
        this.space.animationFrameWorkable(timestemp);
        this.objectManager.objects.forEach(it => it.animationFrameWorkable(timestemp))
        this.me.animationFrameWorkable(timestemp);
        this.controller.animationFrameWorkable(timestemp);
    }

    onDraw() {
        if (this.canvasSet) {
            this.canvasSet.clearCanvas();

            if (this.space.onDrawWrokable(this.canvasSet)) {
                this.objectManager.objects.forEach(it => it.onDrawWrokable(this.canvasSet))
                this.me.onDrawWrokable(this.canvasSet);
                this.controller.onDrawWrokable(this.canvasSet);
            }
            this.debug.onDrawWrokable(this.canvasSet);
        }
        // console.log('draw')
    }


    getTargetEventObjects() {
        const objects: WorldObj[] = [];
        objects.push(this.controller, this.me);
        // z값에 따라서 order by 해야될듯?
        this.objectManager.objects.forEach(it => objects.push(it));
        objects.push(this.space);
        return objects;
    }

    private click(e: MouseEvent) {
        if (e.target) {
            const boundingClientRect = (e.target as HTMLCanvasElement).getBoundingClientRect();
            const pointVector = new PointVector(e.clientX - boundingClientRect.left, e.clientY - boundingClientRect.top);
            for (let targetEventObject of this.getTargetEventObjects()) {
                if (targetEventObject.click(pointVector, e)) {
                    break;
                }
            }
        }
    }

    private mouseDown(e: MouseEvent | TouchEvent) {
        if (e.target) {
            const boundingClientRect = (e.target as HTMLCanvasElement).getBoundingClientRect();
            const pointVector = new PointVector();
            if (e instanceof MouseEvent) {
                pointVector.x = e.clientX - boundingClientRect.left;
                pointVector.y = e.clientY - boundingClientRect.top;
            } else {
                pointVector.x = e.touches[0].clientX - boundingClientRect.left;
                pointVector.y = e.touches[0].clientY - boundingClientRect.top;
            }
            for (let targetEventObject of this.getTargetEventObjects()) {
                if (targetEventObject.mouseDown(pointVector, e)) {
                    break;
                }
            }
        }
    }

    private mouseUp(e: MouseEvent | TouchEvent) {
        if (e.target) {
            const boundingClientRect = (e.target as HTMLCanvasElement).getBoundingClientRect();
            const pointVector = new PointVector();
            if (e instanceof MouseEvent) {
                pointVector.x = e.clientX - boundingClientRect.left;
                pointVector.y = e.clientY - boundingClientRect.top;
            } else {
                pointVector.x = e.touches[0].clientX - boundingClientRect.left;
                pointVector.y = e.touches[0].clientY - boundingClientRect.top;
            }
            for (let targetEventObject of this.getTargetEventObjects()) {
                if (targetEventObject.mouseUp(pointVector, e)) {
                    break;
                }
            }
        }
    }

    private keyDown(e: KeyboardEvent) {
        for (let targetEventObject of this.getTargetEventObjects()) {
            if (targetEventObject.keyDown(e)) {
                break;
            }
        }
    }

    private keyUp(e: KeyboardEvent) {
        for (let targetEventObject of this.getTargetEventObjects()) {
            if (targetEventObject.keyUp(e)) {
                break;
            }
        }
    }
}

const simpleBootFront = new SimpleBootFront(Index, new SimFrontOption(window));
(simpleBootFront.domRendoerExcludeProxy as any[]).push(CanvasRenderingContext2D, ObjectsManager, ResourceManager, WorldManager, Me, Space, Subject);
simpleBootFront.run();
