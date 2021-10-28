export type World = {
    width: number,
    height: number,
    dbf: number, // draw by browserAnimationFrame
    object: any[]
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
