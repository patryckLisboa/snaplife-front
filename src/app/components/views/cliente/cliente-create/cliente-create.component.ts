import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NutricionistaService } from '../../tela-login/nutricionista.service';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {
  hide = true;
  id_nut: number = 0
  cliente: Cliente = {
    senha: '',
    usuario: '',
    nomeCompleto: '',
    email: '',
    telefone: '',
    celular: '', 
    codigo: 0,
    dataNascimento: new Date('2014-25-23'),
    infoAdicionais: '',
    ativo: true,
    nutricionista: {}
  }

  usuario = new FormControl('', [Validators.minLength(3)])
  nomeCompleto = new FormControl('', [Validators.minLength(3)])
  infoAdicionais = new FormControl('', [Validators.minLength(10)])

  constructor(private service: ClienteService, private route: ActivatedRoute, private router: Router, private nutricionistaS: NutricionistaService) { }

  ngOnInit(): void {
    this.id_nut = parseInt(this.route.snapshot.paramMap.get('id')!) // essa variavel foi a que setamos no app-routing.modules.ts
  }

  create(): void {
    
    this.service.create(this.cliente, this.id_nut).subscribe((resposta) =>{
      this.router.navigate([`nutricionista/${this.id_nut}/clientes`])
      this.service.mensagem('Cliente criado com sucesso!')
    }, err => {
      this.router.navigate([`nutricionista/${this.id_nut}/clientes`])
      this.service.mensagem('Erro ao criar outro cliente. Tente mais tarde!')

    } );
  }

  cancel(): void {
    this.router.navigate([`nutricionista/${this.id_nut}/clientes`]);
  }

  getMessage(){
    if(this.usuario.invalid) {
      return "O campo usuario deve conter entre 3 e 100 caracteres";
    }
    if(this.nomeCompleto.invalid) {
      return "O campo nome completo do autor deve conter entre 3 e 100 caracteres";
    }
    if(this.infoAdicionais.invalid) {
      return "O campo informações adicionais deve conter entre 10 e 2.000.000 caracteres";
    }
    return false;
  }

}
