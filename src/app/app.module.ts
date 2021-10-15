import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { MaterialModule } from './material.module'
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'
import { FormsModule } from '@angular/forms'

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireAuthModule } from '@angular/fire/auth'

import { FirebaseService } from '../app/services/firebase.service'
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './main/home/home.component';
import { ClubeComponent } from './main/clube/clube.component';
import { PatrocinioComponent } from './main/patrocinio/patrocinio.component';
import { MercadoComponent } from './main/mercado/mercado.component';
import { DetalhesComponent } from './main/mercado/detalhes/detalhes.component';
import { AuthComponent } from './auth/auth/auth.component';
import { PropostaClubeComponent } from './main/proposta-clube/proposta-clube.component';
import { CadastrarComponent } from './main/cadastrar/cadastrar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ClubeComponent,
    PatrocinioComponent,
    MercadoComponent,
    DetalhesComponent,
    AuthComponent,
    PropostaClubeComponent,
    CadastrarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
