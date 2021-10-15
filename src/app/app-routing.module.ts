import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { ClubeComponent } from './main/clube/clube.component';
import { HomeComponent } from './main/home/home.component';
import { DetalhesComponent } from './main/mercado/detalhes/detalhes.component';
import { MercadoComponent } from './main/mercado/mercado.component';
import { PatrocinioComponent } from './main/patrocinio/patrocinio.component';
import { AuthComponent } from './auth/auth/auth.component'
import { PropostaClubeComponent } from './main/proposta-clube/proposta-clube.component'
import { CadastrarComponent } from './main/cadastrar/cadastrar.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'auth/:name', component: AuthComponent },
  { path: 'login', component: LoginComponent },
  { path: 'propostaclube/:name', component: PropostaClubeComponent },
  { path: 'home/:name', component: HomeComponent },
  { path: 'clube/:name', component: ClubeComponent },
  { path: 'patrocinio/:name', component: PatrocinioComponent },
  { path: 'mercado/:name', component: MercadoComponent },
  { path: 'detalhes/:name/:id', component: DetalhesComponent },
  { path: 'cadastra', component: CadastrarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
