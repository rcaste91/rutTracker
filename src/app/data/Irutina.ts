import { Ejercicio } from './Iejercicio';

export interface Irutina{
    rutinaId:string,
    rutinaNombre:string
}

export class Rutinas implements Irutina{

    constructor(
        public rutinaId:string,
        public rutinaNombre:string
    ){}
}