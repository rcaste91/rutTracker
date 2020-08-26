import { Component, OnInit } from '@angular/core';
import { RutinaService } from '../data/rutina.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rutina-fin',
  templateUrl: './rutina-fin.component.html',
  styleUrls: ['./rutina-fin.component.css']
})
export class RutinaFinComponent implements OnInit {

  constructor(private rutinaService: RutinaService,
    private route:ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }

  onRepetirR():void{
    this.router.navigate(['/rutinaInicio']); 
  }

  onNuevaR():void{
    this.router.navigate(['/rutina']);
  }

}
