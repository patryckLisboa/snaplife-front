import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './components/views/cliente/cliente.component';
import { HomeComponent } from './components/views/home/home.component'
import { LoginComponent } from './components/views/login/login.component';
import { TelaLoginComponent } from './components/views/tela-login/tela-login.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },{
    path: 'telaLogin',
    component: TelaLoginComponent
  },
  {
    path: 'cliente',
    component: ClienteComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
