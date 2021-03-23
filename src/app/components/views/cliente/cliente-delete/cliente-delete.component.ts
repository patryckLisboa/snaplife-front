import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NutricionistaService } from '../../tela-login/nutricionista.service';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

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
    ativo: false,
    nutricionista: {}
  }

  
  constructor(private service: ClienteService, private route: ActivatedRoute, private router: Router, private nutricionistaS: NutricionistaService) { }

  ngOnInit(): void {
    this.id_nut = parseInt(this.route.snapshot.paramMap.get('id')!) // essa variavel foi a que setamos no app-routing.modules.ts
    this.cliente.codigo = parseInt(this.route.snapshot.paramMap.get('id_cli')!) // essa tambem
    this.findById();
  }
  
  onkeypress(event: any) {
    if (event.keyCode === 13) {
      this.delete();
    }
  }

  findById() : void{
    this.service.findById(this.cliente.codigo!).subscribe((resposta) => {
      this.cliente = resposta
    })
  }

  delete() :void{
    this.service.delete(this.cliente.codigo!).subscribe((resposta)=>{
      this.router.navigate([`nutricionista/${this.id_nut}/clientes`])
      this.service.mensagem("Cliente deletado com sucesso!")
      console.log(resposta)
      console.log(this.cliente)
    }, err => {
     
      this.service.mensagem("Erro ao deletar cliente. Tente mais tarde!")
      console.log(err.errors.erro)
      console.log(this.cliente)
    })
  }


  cancel(): void {
    this.router.navigate([`nutricionista/${this.id_nut}/clientes`]);
  }
}
