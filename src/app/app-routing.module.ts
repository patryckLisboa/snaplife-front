import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteCreateComponent } from './components/views/cliente/cliente-create/cliente-create.component';
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
    path: 'nutricionista/:id/clientes',
    component: ClienteComponent
  },
  {
    path: 'nutricionista/:id/clientes/create',
    component: ClienteCreateComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
