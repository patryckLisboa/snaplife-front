import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from './cliente.model';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {


  displayedColumns: string[] = ['codigo', 'nomeCompleto', 'infoAdicionais', 'ativo', 'acoes'];
  clientes: Cliente[] = []; 
  id_nut: number = 0;

  constructor(private service: ClienteService, private rout: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id_nut = parseInt(this.rout.snapshot.paramMap.get('id')!);
    this.findAll()
  }

  findAll(): void {
    this.service.findAllByNutricionista(this.id_nut).subscribe((resposta) => {
      this.clientes = resposta;
    })
  }

  navegarParaCriarCliente(): void {
    this.router.navigate([`nutricionista/${this.id_nut}/clientes/create`])
  }


}
