import { Injectable } from '@angular/core';
import { IrutinaTemp } from './IrutinaTemp';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {

  
  private _tDescanso : string;
  public get tDescanso() : string {
    return this._tDescanso;
  }
  public set tDescanso(v : string) {
    this._tDescanso = v;
  }
    
  private _rutina : IrutinaTemp[];
  public get rutina() : IrutinaTemp[] {
    return this._rutina;
  }
  public set rutina(v : IrutinaTemp[]) {
    this._rutina = v;
  }
  

  constructor() { }
}
