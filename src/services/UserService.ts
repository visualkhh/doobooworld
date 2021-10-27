import { Sim } from 'simple-boot-core/decorators/SimDecorator';
import { OnSimCreate } from 'simple-boot-core/lifecycle/OnSimCreate';
import { BehaviorSubject } from 'rxjs';
import { UserDetails } from 'models/models';
import { ApiService } from 'services/ApiService';
import { defaultWorld } from 'manasgers/WorldManager';

export const defaultUser = {
    name: 'guest', use: false, world: {
        center: {
            x: Math.floor(defaultWorld.width / 2),
            y: Math.floor(defaultWorld.height / 2),
        },
        zoom: 15
    }
} as UserDetails;

@Sim()
export class UserService implements OnSimCreate {
    public subject = new BehaviorSubject<UserDetails>(defaultUser);

    constructor(public apiService: ApiService) {
    }

    onSimCreate(): void {
        this.apiService.get<UserDetails>('/datas/user-details.json').then((it => this.subject.next(it)))
    }


}
