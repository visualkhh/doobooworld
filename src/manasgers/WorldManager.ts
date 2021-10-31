import { Sim } from 'simple-boot-core/decorators/SimDecorator';
import { DomRenderProxy } from 'dom-render/DomRenderProxy';
import { ApiService } from 'services/ApiService';
import { OnSimCreate } from 'simple-boot-core/lifecycle/OnSimCreate';
import { UserDetailsData, WorldData } from 'models/models';
import { BehaviorSubject } from 'rxjs';

export type WorldCallBack = {
    animationFrame: (timestemp: number) => void;
    draw: () => void
}

export const defaultWorld = {
    dbf: 30,
    w: 1000,
    h: 1000,
    use: false
} as WorldData

@Sim()
export class WorldManager implements OnSimCreate {

    public subject = new BehaviorSubject<WorldData>(defaultWorld);

    private draw: { animationCount: number, dbf: number, animationFrameId?: number, callback?: WorldCallBack} = DomRenderProxy.final({animationCount: 0, dbf: defaultWorld.dbf})

    constructor(public apiService: ApiService) {
        this.apiService.get<WorldData>('/datas/world.json').then(it => {
            this.draw.dbf = it.dbf;
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
        this.draw.callback?.animationFrame(timestamp);
        // console.log('--->', timestamp - this.afterTimeStemp, time - this.afterTime);
        // this.afterTimeStemp = timestamp;
        // this.afterTime = time;
        if (this.draw.dbf <= 0 || this.draw.animationCount % this.draw.dbf === 0) {
            this.draw.callback?.draw();
            this.draw.animationCount = 0;
        }
        this.draw.animationCount++;
        this.draw.animationFrameId = window.requestAnimationFrame(this.drawIntervalStep.bind(this));
    }

}
