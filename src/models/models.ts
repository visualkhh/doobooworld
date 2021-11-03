export type WorldObjDataType = 'ptdb' | 'stick'
export type PositionData = {
    x: number,
    y: number
}
export type VolumeData = {
    w: number,
    h: number
}

export type WorldObjData = {
    type: WorldObjDataType,
    img: string,
    frame: number,
    pbf: number,
    position: PositionData,
    volume: VolumeData,
}
export type WorldData = {
    w: number,
    h: number,
    frame: number,
    pbf: number, // processing by browserAnimationFrame
    dbf: number, // draw by browserAnimationFrame
    objects: WorldObjData[],
    use: boolean;
}



export type UserDetailsData = {
    name: string;
    use: boolean;
    world: {
        position: PositionData,
        zoom: number;
    }
}
