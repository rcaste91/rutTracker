import { Component, OnInit } from '@angular/core';
import { RutinaService } from '../data/rutina.service';
import { IrutinaTemp } from '../data/IrutinaTemp';
import { interval, NEVER, empty,of,  fromEvent, timer, BehaviorSubject} from 'rxjs';
import { switchMap, map, timeout, takeWhile } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { nextTick } from 'process';

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
  progress:number=0;
  ejercicio:string="Vamos, tu puedes";
  audioComplete = new Audio();
  audioReady= new Audio();

  banderaRutina:boolean=false;
  estadoRutina:boolean=false;         //verificar si rutina esta iniciada o en pausa
  tiempoArreglo:number[];
  ejercicioArreglo:string[];
  counter:number=0;

  constructor(private rutinaService: RutinaService,
              private route:ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.rutina=this.rutinaService.rutina;
    this.tDescanso=this.rutinaService.tDescanso;

    this.loadSounds();
    this.tiempoArreglo=this.crearArregloTiempo(); 
    this.ejercicioArreglo=this.crearArregloEjercicio();
    this.tiempo=this.tiempoArreglo[this.counter];

    //this.initService();
      
  }

  timer():void{
        
    let tiempoEjercicio=0;

    if(this.estadoRutina){
      if(this.tiempo!=0){
        //reduccion a 1 seg de timer
        this.tiempo=this.tiempo-1;
        this.progress= this.calculoProgress(this.tiempo,tiempoEjercicio);
        console.log("progrso "+this.progress);

        //logica para sonidos de countdown
        if(this.tiempo<4 && this.tiempo>0){
          this.audioReady.play();
        }
        if(this.tiempo==0){
          this.audioComplete.play();
        }

      }else{

        //logica para seguir al siguiente ejercicio
        this.counter++;
        if(this.counter<this.tiempoArreglo.length){
          this.ejercicio=this.ejercicioArreglo[this.counter];
          this.tiempo=this.tiempoArreglo[this.counter];
          tiempoEjercicio =this.tiempoArreglo[this.counter];
        }else{
          this.onEnd();
        }
      }
    }

  }

  calculoProgress(progress:number, progressCompleto:number):number{

    let valorProgress =(progress*100)/progressCompleto;
    return valorProgress;
  }

  initService():void{

    let tiempoEjercicio=0;

    const crono=interval(1000)
      .pipe(takeWhile (x => this.banderaRutina));

    crono.subscribe( n =>
      {
        if(this.estadoRutina){
          if(this.tiempo!=0){
            //reduccion a 1 seg de timer
            this.tiempo=this.tiempo-1;
            this.progress= this.calculoProgress((tiempoEjercicio - this.tiempo),tiempoEjercicio);

            //logica para sonidos de countdown
            if(this.tiempo<4 && this.tiempo>0){
              this.audioReady.play();
            }
            if(this.tiempo==0){
              this.audioComplete.play();
            }

          }else{
            //logica para seguir al siguiente ejercicio
            this.counter++;
            if(this.counter<this.tiempoArreglo.length){
              this.progress=0;
              this.ejercicio=this.ejercicioArreglo[this.counter];
              this.tiempo=this.tiempoArreglo[this.counter];
              tiempoEjercicio =this.tiempoArreglo[this.counter];
            }else{
              this.banderaRutina=false;
              this.onEnd();
            }
          }
        }
      });
      

  }

  inicioTimer(): void {

    if(!this.banderaRutina){
      this.initService();
      this.banderaRutina=true;
    }

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

  crearArregloEjercicio():string[]{

    let arrEjercicio:string[]=[];
    let counter:number = 0;
    arrEjercicio.push("Inicio");

    this.rutina.forEach( r => {
      arrEjercicio.push(r.nombre);
      if(counter!=(this.rutina.length-1)){
        arrEjercicio.push("Descanso");
      }
      counter++;
    });

    return arrEjercicio;
  }

  onEnd() :void {
    this.audioComplete = new Audio();
    this.audioReady = new Audio();
    this.estadoRutina=false;
    this.router.navigate(['/rutinaFin']);
  }

  onCancelar() :void {
    this.audioComplete = new Audio();
    this.audioReady = new Audio();
    this.banderaRutina=false;
    this.router.navigate(['/rutina']);
  }

  loadSounds():void{
    this.audioReady.src="assets/sounds/beepR.wav";
    this.audioReady.load;
    this.audioComplete.src="assets/sounds/beepC.mp3";
    this.audioComplete.load;
  }

}
