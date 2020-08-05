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
  audioComplete = new Audio();
  audioReady= new Audio();

  inicioRutina:boolean=false;
  estadoRutina:boolean=false;         //verificar si rutina esta iniciada o en pausa
  tiempoArreglo:number[];
  counter:number=0;

  constructor(private rutinaService: RutinaService,
              private route:ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.rutina=this.rutinaService.rutina;
    this.tDescanso=this.rutinaService.tDescanso;

    this.loadSounds();
    this.tiempoArreglo=this.crearArregloTiempo(); 
    this.tiempo=this.tiempoArreglo[this.counter];

    this.initService();
      
  }


  initService():void{

    const toggle = new BehaviorSubject(true);
    const toRemainingSeconds = (t: number) => 100-t;
    
    const crono=toggle
    .pipe(switchMap((running : boolean)=>(running ? interval(1000):NEVER)),
    map(toRemainingSeconds),
    takeWhile(val => val != 0),
    );
  

    crono.subscribe( n =>
      {
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
                this.tiempo=this.tiempoArreglo[this.counter];
              }else{
                this.onEnd();
              }
            }
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
    this.audioComplete = new Audio();
    this.audioReady = new Audio();
    this.estadoRutina=false;
    this.router.navigate(['/rutina']);
  }

  onCancelar() :void {
    this.audioComplete = new Audio();
    this.audioReady = new Audio();
    this.router.navigate(['/rutina']);
  }

  loadSounds():void{
    this.audioReady.src="assets/sounds/beepR.wav";
    this.audioReady.load;
    this.audioComplete.src="assets/sounds/beepC.mp3";
    this.audioComplete.load;
  }

}
