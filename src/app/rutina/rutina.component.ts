import { Component, OnInit } from '@angular/core';
import {IrutinaTemp, rutinaTemp} from '../data/IrutinaTemp';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RutinaService } from '../data/rutina.service';

@Component({
  selector: 'app-rutina',
  templateUrl: './rutina.component.html',
  styleUrls: ['./rutina.component.css']
})
export class RutinaComponent implements OnInit {

  btnStart = "Empezar";
  numberE:number;
  tDescanso:string;
  ejercicios: IrutinaTemp[]=[];
  errorForm: boolean = false;

  constructor(private route:ActivatedRoute,
              private router: Router,
              private rutinaService: RutinaService ) { }

  ngOnInit(): void {
  }

  ///Crear tabla para ingresar ejercicios y tiempos
  onStartR(): void{

    this.ejercicios=[];
    var numberLoop = this.numberE;

    for(var i=0;i<numberLoop;i++){
      this.ejercicios.push(new rutinaTemp(i,"",""));
    }

  }

  onSubmit(form:NgForm){
    
    if (form.valid){
      this.rutinaService.rutina = this.ejercicios;
      this.rutinaService.tDescanso=this.tDescanso;
      this.router.navigate(['/rutinaInicio']);
    }else{
      this.errorForm=true;
    }

  }

}
