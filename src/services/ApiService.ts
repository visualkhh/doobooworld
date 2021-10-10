import { Sim } from 'simple-boot-core/decorators/SimDecorator';
import { environment } from '@environments/environment';

@Sim()
export class ApiService {

    public get<T>(url: string): Promise<T> {
        return fetch(environment.apiHostUrl + url).then((response) => response.json());
        // const p = this.alertService.showProgress(title);
        // p.open();
        // return fetch(environment.apiHostUrl + url).then((response) => response.json()).catch(it => {
        //     p.close();
        //     this.alertService.showDanger(`${title} 가져오지 못하였습니다.`);
        // }).finally(() => p.close());
    }

}
