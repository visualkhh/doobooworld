import { Sim } from 'simple-boot-core/decorators/SimDecorator';
import { filter, from, of } from 'rxjs';
import { WorldObj } from 'objects/base/WorldObj';
import { WorldData, WorldObjData, WorldObjDataType } from 'models/models';
import { PTDB } from 'objects/PTDB';
import { WorldManager } from 'manasgers/WorldManager';
import { Space } from 'objects/Space';
import { Stick } from 'objects/Stick';
import { ResourceManager } from 'manasgers/ResourceManager';
@Sim()
export class ObjectsManager {
    public objects: WorldObj[] = [];
    private worldData?: WorldData;

    constructor(private worldManager: WorldManager, private resourceManager: ResourceManager, private space: Space) {
        this.worldManager.subject.pipe(filter(it => it.use)).subscribe(it => {
            this.worldData = it;
            this.worldData.objects.forEach(it => {
                this.addObject(it)
            })
        })
    }

    addObject(obj: WorldObjData) {
        if (obj.type === 'ptdb') {
            this.objects.push(new PTDB((this.space)!, obj))
        } else if (obj.type === 'stick') {
            this.objects.push(new Stick(this.resourceManager, (this.space)!, obj))
        }
    }
}

