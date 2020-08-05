import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ejercicio-lista',
  templateUrl: './ejercicio-lista.component.html',
  styleUrls: ['./ejercicio-lista.component.css']
})
export class EjercicioListaComponent implements OnInit {

  rutinaId:string;

  constructor(private route:ActivatedRoute,
    private router: Router) {
   }

  ngOnInit(): void {
     this.rutinaId =this.route.snapshot.paramMap.get('id');
  }

}
