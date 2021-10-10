import { Sim } from 'simple-boot-core/decorators/SimDecorator';
import { LifeCycle } from 'simple-boot-core/cycles/LifeCycle';
import { DomRenderProxy } from 'dom-render/DomRenderProxy';
import { ApiService } from 'services/ApiService';
import { UserDetails, World } from 'models/models';
import { BehaviorSubject } from 'rxjs';

@Sim()
export class WorldManager implements LifeCycle {
    public subject = new BehaviorSubject<World>({width: 10, height: 10} as World);

    public tile = {
        size: 50
    }

    private draw: { animationCount: number, fps: number, animationFrameId?: number, callback?: () => void, bind?: any } = DomRenderProxy.final({animationCount: 0, fps: 30})

    constructor(public apiService: ApiService) {
        this.apiService.get<World>('/datas/world.json').then(it => this.subject.next(it))
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

}
