export interface IrutinaTemp{
    id:number,
    nombre:string,
    tiempo: string
}

export class rutinaTemp implements IrutinaTemp{

    /**
     *
     */
    constructor(
        public id:number,
        public nombre:string,
        public tiempo:string
    ) {
        
        
    }
}