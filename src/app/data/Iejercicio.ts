export interface Iejercicio{
    ejercicioId:number,
    ejercicioNombre:string,
    ejercicioReps:number,
    ejercicioSets:number,
    ejercicioPeso:number,
    ejercicioTiempo:number,
    rutinaId:string
}

export class Ejercicio implements Iejercicio{

    constructor(
        public ejercicioId:number,
        public ejercicioNombre:string,
        public ejercicioReps:number,
        public ejercicioSets:number,
        public ejercicioPeso:number,
        public ejercicioTiempo:number,
        public rutinaId:string
    ){}
  
}