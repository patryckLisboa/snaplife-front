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
  hide2 = true;
  
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
    ativo: false,
    nutricionista: {}
  }


  senhaConfirm = ''
  usuario = new FormControl('', [Validators.minLength(3)])
  nomeCompleto = new FormControl('', [Validators.minLength(3)])
  infoAdicionais = new FormControl('', [Validators.minLength(0)])
  email = new FormControl('', [Validators.minLength(3)])
  senha = new FormControl('', [Validators.minLength(9)])
  senhaConfirma = new FormControl('', [Validators.minLength(9)])
  telefone = new FormControl('', [Validators.minLength(6)])
  celular = new FormControl('', [Validators.minLength(6)])
  
  constructor(private service: ClienteService, private route: ActivatedRoute, private router: Router, private nutricionistaS: NutricionistaService) { }

  ngOnInit(): void {
    this.id_nut = parseInt(this.route.snapshot.paramMap.get('id')!) // essa variavel foi a que setamos no app-routing.modules.ts
  
    
  }
  
  onkeypress(event: any) {
    if (event.keyCode === 13) {
      this.create();
    }
  }
  

  create(): void {
    if (this.senhaConfirm === this.cliente.senha){
     
      this.service.create(this.cliente, this.id_nut).subscribe((resposta) =>{
      
        this.router.navigate([`nutricionista/${this.id_nut}/clientes`])
        this.service.mensagem('Cliente criado com sucesso!')
        console.log(resposta)
        console.log(this.cliente)
      }, err => {
        for (let i = 0; i < err.error.errors.length; i++){
          this.service.mensagem(err.error.errors[i].message)
        }

        console.log(err.errors.erro)
        console.log(this.cliente)

      } );
    }else{
      this.service.mensagem('Campo confirma????o de senha com valor diferente da senha')
    }
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
      return "O campo informa????es adicionais deve conter entre 10 e 2.000 caracteres";
    }    
    if(this.email.invalid) {
      return "O campo nome completo do autor deve conter entre 3 e 100 caracteres";
    }
    if(this.senha.invalid) {
      return "O campo nome completo do autor deve conter entre 9 e 11 caracteres";
    }
    if(this.senhaConfirma.invalid) {
      return "O campo nome completo do autor deve conter entre 9 e 11 caracteres";
    }
    if(this.telefone.invalid) {
      return "O campo nome completo do autor deve conter entre 6 e 20 caracteres";
    }
    if(this.celular.invalid) {
      return "O campo nome completo do autor deve conter entre 6 e 20 caracteres";
    }
    return false;
  }

}
