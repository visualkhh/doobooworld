import { WorldObj } from 'objects/base/WorldObj';
import { CanvasSet } from 'domains/CanvasSet';
import { ResourceManager } from 'manasgers/ResourceManager';
import { PointVector } from 'math/PointVector';

export abstract class Direction extends WorldObj {
    private normal?: HTMLImageElement;
    private down?: HTMLImageElement;
    public current?: HTMLImageElement;
    constructor(private resourceManager: ResourceManager) {
        super();
        resourceManager.loadImage(this.getNormalImageUrl()).subscribe(it => this.current = this.normal = it);
        resourceManager.loadImage(this.getDowmImageUrl()).subscribe(it => this.down = it);
    }

    abstract getKey(): string[];
    abstract getSpeed(): PointVector;
    abstract getNormalImageUrl(): string;
    abstract getDowmImageUrl(): string;

    animationFrame(timestamp: number): void {
    }

    isWorkable(): boolean {
        return this.x > 0 && this.y > 0 && this.w > 0 && this.h > 0 && this.current !== undefined && this.normal !== undefined && this.down !== undefined;
    }

    isPress() {
        if (this.current && this.down && this.current === this.down) {
            return true;
        } else {
            return false;
        }
    }

    mouseDown(point: PointVector, event: MouseEvent) {
        if (this.isIncludePoint(point)) {
            this.current = this.down;
            return true;
        }
        return false;
    }

    mouseUp(point: PointVector, event: MouseEvent) {
        this.current = this.normal;
        return false;
    }

    keyDown(event: KeyboardEvent) {
        if (this.getKey().includes(event.key)) {
            this.current = this.down;
            return true;
        }
        return false;
    }

    keyUp(event: KeyboardEvent) {
        this.current = this.normal;
        return false;
    }

    onDraw(canvasSet: CanvasSet): void {
        const context = canvasSet.context;
        context.drawImage(this.current!, this.x, this.y, this.w, this.h);
        // context.strokeRect(this.x, this.y, this.w, this.h);
    }

}
