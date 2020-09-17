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
import { WelcomeComponent } from './welcome/welcome.component';
import { RutinaFinComponent } from './rutina-fin/rutina-fin.component';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {GoogleLoginProvider,FacebookLoginProvider} from 'angularx-social-login';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    RutinaListaComponent,
    EjercicioListaComponent,
    RutinaComponent,
    RutinaInicioComponent,
    WelcomeComponent,
    RutinaFinComponent,
    LoginComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    SocialLoginModule,
    BrowserModule,
    RouterModule.forRoot([
      {path:'welcome', component:WelcomeComponent},
      //{path:'login', component:LoginComponent},
      {path:'rutina', component:RutinaComponent},
      {path:'rutinaInicio',component:RutinaInicioComponent},
      {path:'rutinaFin',component:RutinaFinComponent},
      {path:'', redirectTo:'welcome', pathMatch:'full'},
      {path:'**',redirectTo:'welcome',pathMatch:'full'}
    ])
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1480824862089538'),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
