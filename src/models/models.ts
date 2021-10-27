export type World = {
    width: number,
    height: number,
    fps: number,
    object: any[]
}



export type UserDetails = {
    name: string;
    use: boolean;
    world: {
        center: {
            x: number,
            y: number
        },
        zoom: number;
        // tile: {
        // }
    }
}
