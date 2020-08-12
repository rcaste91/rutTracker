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
  ejercicio:string="";
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
          this.ejercicio=this.ejercicioArreglo[this.counter];
          this.tiempo=this.tiempoArreglo[this.counter];
        }else{
          this.onEnd();
        }
      }
    }

  }

  initService():void{

    /*
    let totalTiempo = this.tiempoArreglo.reduce((a,b)=> a+b);
    const toggle = new BehaviorSubject(true);
    const toRemainingSeconds = (t: number) => totalTiempo -t;
    
    const crono=toggle
    .pipe(switchMap((running : boolean)=>(running ? interval(1000):NEVER)),
    map(toRemainingSeconds),
    takeWhile(val => val != 0),
    );
    */

    const crono=interval(1000)
      .pipe(takeWhile (x => this.banderaRutina));

    crono.subscribe( n =>
      {
        console.log(this.banderaRutina);
        console.log(n);
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
              this.ejercicio=this.ejercicioArreglo[this.counter];
              this.tiempo=this.tiempoArreglo[this.counter];
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
    this.router.navigate(['/rutina']);
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
