import { Sim } from 'simple-boot-core/decorators/SimDecorator';
import { LifeCycle } from 'simple-boot-core/cycles/LifeCycle';
import { DomRenderProxy } from 'dom-render/DomRenderProxy';
import { ApiService } from 'services/ApiService';
import { World } from 'models/models';

@Sim()
export class WorldManager implements LifeCycle {
    public tile = {
        size: 50
    }

    private draw: { animationCount: number, fps: number, animationFrameId?: number, callback?: () => void, bind?: any } = DomRenderProxy.final({animationCount: 0, fps: 30})

    constructor(public apiService: ApiService) {
    }

    onCreate() {
    }


    drawInterval(callback: () => void, bind: any) {
        this.draw.callback = callback.bind(bind);
        this.draw.bind = bind;
        this.draw.animationFrameId = window.requestAnimationFrame(this.drawIntervalStep.bind(this));
    }

    private drawIntervalStep(timestamp: number) {
        if (this.draw.fps <= 0 || this.draw.animationCount % this.draw.fps === 0) {
            this.draw?.callback?.()
        }
        this.draw.animationCount++;
        this.draw.animationFrameId = window.requestAnimationFrame(this.drawIntervalStep.bind(this));
    }

    getWorld(): Promise<World> {
        return this.apiService.get('/datas/map.json').then()
    }

}
