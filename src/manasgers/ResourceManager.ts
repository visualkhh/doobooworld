import { Sim } from 'simple-boot-core/decorators/SimDecorator';
import { from, Observable, of } from 'rxjs';
@Sim()
export class ResourceManager {
    private imgs = new Map<string, HTMLImageElement>();

    loadImage(url: string): Observable<HTMLImageElement> {
        const img = this.imgs.get(url);
        return img ? of(img) : from(new Promise((resolve, reject) => {
            const img = new Image();
            img.addEventListener('load', () => {
                this.imgs.set(url, img);
                resolve(img);
            });
            img.addEventListener('error', (err) => reject(err));
            img.src = url;
        })) as Observable<HTMLImageElement>;
    }
}
