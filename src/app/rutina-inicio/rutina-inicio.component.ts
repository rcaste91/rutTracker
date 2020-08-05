import { Component, OnInit } from '@angular/core';
import { RutinaService } from '../data/rutina.service';
import { IrutinaTemp } from '../data/IrutinaTemp';
import { interval, Observable, timer, NEVER, empty,of, scheduled} from 'rxjs';
import { map, tap, takeWhile, share, startWith, switchMap, filter } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rutina-inicio',
  templateUrl: './rutina-inicio.component.html',
  styleUrls: ['./rutina-inicio.component.css']
})
export class RutinaInicioComponent implements OnInit {

  rutina:IrutinaTemp[];
  tDescanso:string;
  mensajeBoton:string = "Iniciar";
  tiempo:number=0;
  audioComplete = new Audio();
  audioReady= new Audio();

  inicioRutina:boolean=false;
  estadoRutina:boolean=false;         //verificar si rutina esta iniciada o en pausa
  tiempoArreglo:number[];
  counter:number=0;
  crono:any;

  constructor(private rutinaService: RutinaService,
              private route:ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.rutina=this.rutinaService.rutina;
    this.tDescanso=this.rutinaService.tDescanso;

    this.loadSounds();
    this.tiempoArreglo=this.crearArregloTiempo(); 
    this.tiempo=this.tiempoArreglo[this.counter];

    this.crono=of(this.tiempoArreglo).pipe(
      switchMap((estadoRutina)=>(estadoRutina ? interval(1000):NEVER))
    );
      this.initService();
  }

  initService():void{
    this.crono.subscribe( n =>
      {
        if(this.estadoRutina){
          if(this.tiempo!=0){
            this.tiempo=this.tiempo-1;
            if(this.tiempo<4 && this.tiempo>0){
              this.audioReady.play();
            }
            if(this.tiempo==0){
              this.audioComplete.play();
            }
          }else{
            this.counter++;
            if(this.counter<this.tiempoArreglo.length){
              this.tiempo=this.tiempoArreglo[this.counter];
            }else{
              this.onEnd();
            }
          }
        }else{
          empty();
        }
        
      });
  }

  inicioTimer(): void {

    this.inicioRutina=true;
    this.estadoRutina=!this.estadoRutina;
    if(this.estadoRutina){
      this.mensajeBoton="Pausa";
    }else{
      this.mensajeBoton="Iniciar";
    }

  }

  /*
  crea arreglo de tiempo de rutina con tiempos de descanso
  */
  crearArregloTiempo():number[]{

    let arrTiempo:number[]=[];
    let counter:number = 0;
    arrTiempo.push(5);

    this.rutina.forEach( r => {
      arrTiempo.push(parseInt(r.tiempo));
      if(counter!=(this.rutina.length-1)){
        arrTiempo.push(parseInt(this.tDescanso));
      }
      counter++;
    });

    return arrTiempo;
  }

  onEnd() :void {
    this.router.navigate(['/rutina']);
  }

  onCancelar() :void {
    this.router.navigate(['/rutina']);
  }

  loadSounds():void{
    this.audioReady.src="assets/sounds/beepR.wav";
    this.audioReady.load;
    this.audioComplete.src="assets/sounds/beepC.mp3";
    this.audioComplete.load;
  }

}
