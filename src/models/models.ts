export interface World {
    width: number,
    height: number,
    object: any[]
}



export interface UserDetails {
    name: string;
    use: boolean;
    world: {
        center: {
            x: number,
            y: number
        },
        tile: {
            size: number;
        }
    }
}
