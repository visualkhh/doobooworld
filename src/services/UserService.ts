import { Sim } from 'simple-boot-core/decorators/SimDecorator';
import { LifeCycle } from 'simple-boot-core/cycles/LifeCycle';
import { DomRenderProxy } from 'dom-render/DomRenderProxy';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { UserDetails } from 'models/models';
import { ApiService } from 'services/ApiService';

@Sim()
export class UserService implements LifeCycle {
    public subject = new BehaviorSubject<UserDetails>({name: 'guest', use: false} as UserDetails);

    constructor(public apiService: ApiService) {
    }

    onCreate(): void {
        this.apiService.get<UserDetails>('/datas/user-details.json').then((it => this.subject.next(it)))
    }



}
