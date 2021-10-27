import { Sim } from 'simple-boot-core/decorators/SimDecorator';
import { DomRenderProxy } from 'dom-render/DomRenderProxy';
import { ApiService } from 'services/ApiService';
import { OnSimCreate } from 'simple-boot-core/lifecycle/OnSimCreate';
import { UserDetails, World } from 'models/models';
import { BehaviorSubject } from 'rxjs';

export type WorldCallBack = {
    time: (timestemp: number) => void;
    draw: () => void
}

export const defaultWorld = {
    fps: 30,
    width: 1000,
    height: 1000
} as World

@Sim()
export class WorldManager implements OnSimCreate {

    public subject = new BehaviorSubject<World>(defaultWorld);

    private draw: { animationCount: number, fps: number, animationFrameId?: number, callback?: WorldCallBack} = DomRenderProxy.final({animationCount: 0, fps: defaultWorld.fps})

    constructor(public apiService: ApiService) {
        this.apiService.get<World>('/datas/world.json').then(it => {
            this.draw.fps = it.fps;
            this.subject.next(it);
        })
    }

    onSimCreate() {
    }


    drawInterval(callback: WorldCallBack) {
        this.draw.callback  = callback;
        this.draw.animationFrameId = window.requestAnimationFrame(this.drawIntervalStep.bind(this));
    }

    // afterTimeStemp: number = 0;
    // afterTime: number = 0;
    private drawIntervalStep(timestamp: number) {
        // const time = new Date().getTime();
        this.draw.callback?.time(timestamp);
        // console.log('--->', timestamp - this.afterTimeStemp, time - this.afterTime);
        // this.afterTimeStemp = timestamp;
        // this.afterTime = time;
        if (this.draw.fps <= 0 || this.draw.animationCount % this.draw.fps === 0) {
            this.draw.callback?.draw();
            this.draw.animationCount = 0;
        }
        this.draw.animationCount++;
        this.draw.animationFrameId = window.requestAnimationFrame(this.drawIntervalStep.bind(this));
    }

}
