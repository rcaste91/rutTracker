import { Component, OnInit } from '@angular/core';
import { Irutina, Rutinas } from '../data/Irutina';
import { EjercicioService } from '../data/ejercicio.service';

@Component({
  selector: 'app-rutina-lista',
  templateUrl: './rutina-lista.component.html',
  styleUrls: ['./rutina-lista.component.css']
})
export class RutinaListaComponent implements OnInit {

  items: Array<any>;
  rutinas: Irutina[]=[];
  rutinasTam:number=0;

  constructor(private ejercicioService: EjercicioService) { }

  ngOnInit(): void {
    
    this.ejercicioService.getRutinas().subscribe(
      result => {
        this.items=result;
        this.items.forEach(element =>{
          this.rutinas.push(new Rutinas(element.payload.doc.id, element.payload.doc.data().nombre));
        })
      }
    );

    

  }

}
