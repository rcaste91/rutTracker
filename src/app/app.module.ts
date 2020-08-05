import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RutinaListaComponent } from './rutina-lista/rutina-lista.component';

import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import { EjercicioListaComponent } from './ejercicio-lista/ejercicio-lista.component';
import { RutinaComponent } from './rutina/rutina.component';
import { RutinaInicioComponent } from './rutina-inicio/rutina-inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    RutinaListaComponent,
    EjercicioListaComponent,
    RutinaComponent,
    RutinaInicioComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    BrowserModule,
    RouterModule.forRoot([
      {path:'welcome', component:RutinaListaComponent},
      {path:'ejercicio/:id', component:EjercicioListaComponent},
      {path:'rutina', component:RutinaComponent},
      {path:'rutinaInicio',component:RutinaInicioComponent},
      {path:'', redirectTo:'welcome', pathMatch:'full'},
      {path:'**',redirectTo:'welcome',pathMatch:'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
