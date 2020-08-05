import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'  
})
export class EjercicioService {

  constructor(private db: AngularFirestore) { }

  getRutinas(){
    return this.db.collection('/rutinas').snapshotChanges();
  }

  getEjercicios(rutinaId:string){

    let ruta = '/rutinas/'+rutinaId+'/ejercicios';
    return this.db.collection(ruta).snapshotChanges();
  }
  
}
