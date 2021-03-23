import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteCreateComponent } from './components/views/cliente/cliente-create/cliente-create.component';
import { ClienteDeleteComponent } from './components/views/cliente/cliente-delete/cliente-delete.component';
import { ClienteUpdateComponent } from './components/views/cliente/cliente-update/cliente-update.component';
import { ClienteComponent } from './components/views/cliente/cliente.component';
import { ConsultaReadComponent } from './components/views/consulta/consulta-read/consulta-read.component';
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
  },
  {
    path: 'nutricionista/:id/clientes/delete/:id_cli',
    component: ClienteDeleteComponent
  },
  {
    path: 'nutricionista/:id/clientes/update/:id_cli',
    component: ClienteUpdateComponent
  },
  {
    path: 'nutricionista/:id/clientes/:id_cli/consultas',
    component: ConsultaReadComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
