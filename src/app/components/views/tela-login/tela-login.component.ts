import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nutricionista } from './nutricionista.model';
import { NutricionistaService } from './nutricionista.service';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.css']
})
export class TelaLoginComponent implements OnInit {

  nutricionista: Nutricionista = {
    codigo: '',
    celular: '',
    certificados: '',
    usuario: '',
    email: '',
    nomeCompleto: '',
    senha: '',
    telefone: ''
  }

  hide = true;

  nutricionistas: Nutricionista[] = [];

  constructor(private service: NutricionistaService, private router: Router) { }

  ngOnInit(): void {
    this.findAll();
  } // sempre que a aplicação iniciar

  findAll(){
    this.service.findAll().subscribe(resposta => {
      this.nutricionistas = resposta;
    });
  }

  navegarParaCategoriaClientes(){
    this.nutricionistas.forEach((nut) =>{
      if(nut.senha == this.nutricionista.senha || nut.usuario == this.nutricionista.usuario){
        this.router.navigate(["/cliente"]);
      }
    })
  }
}


