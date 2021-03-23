import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NutricionistaService } from '../../tela-login/nutricionista.service';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {
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
    ativo: true,
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
    this.cliente.codigo = parseInt(this.route.snapshot.paramMap.get('id_cli')!) // essa tambem
    this.findById();

  }
  
  findById() : void{
    this.service.findById(this.cliente.codigo!).subscribe((resposta) => {
      this.cliente = resposta
      console.log(this.cliente)
      
    })
  }

  onkeypress(event: any) {
    if (event.keyCode === 13) {
      this.update();
    }
  }
  
  update() : void{
    
    
      this.service.update(this.cliente).subscribe((resposta) =>{ 
        this.router.navigate([`nutricionista/${this.id_nut}/clientes`])
        this.service.mensagem("Cliente atualizado com sucesso!")
        console.log(resposta)
        console.log(this.cliente)
      }, err => {
        this.service.mensagem("Erro ao atualizar cliente. Tente mais tarde!")
        for (let i = 0; i < err.error.errors.length; i++){
          this.service.mensagem(err.error.errors[i].message)
        }
        console.log(this.cliente)
      })
 
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
      return "O campo informações adicionais deve conter entre 10 e 2.000 caracteres";
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
