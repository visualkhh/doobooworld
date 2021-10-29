export type World = {
    w: number,
    h: number,
    dbf: number, // draw by browserAnimationFrame
    object: any[],
    use: boolean;
}



export type UserDetails = {
    name: string;
    use: boolean;
    world: {
        position: {
            x: number,
            y: number
        },
        zoom: number;
    }
}
