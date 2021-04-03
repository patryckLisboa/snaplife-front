import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import { Nutricionista } from '../tela-login/nutricionista.model';
import { NutricionistaService } from '../tela-login/nutricionista.service';
import { Cliente } from './cliente.model';
import { ClienteService } from './cliente.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';



export interface UserData {
  senha?: String,
  usuario?: String,
  nomeCompleto?: String,
  email?: String,
  telefone?: String,
  celular?: String, 
  codigo?: number,
  dataNascimento?: Date,
  infoAdicionais?: String,
  ativo?: Boolean,
  nutricionista?: Nutricionista
}

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})

export class ClienteComponent implements OnInit, AfterViewInit{

  
  displayedColumns: string[] = ['codigo', 'nomeCompleto', 'infoAdicionais', 'ativo', 'acoes'];
  clientes: Cliente[] = []; 
  dataSource: MatTableDataSource<UserData> = new MatTableDataSource(this.clientes);
  id_nut: number = 0;
  nutricionista: Nutricionista = {};
  nomeNut: String = ''
  cliente: Cliente = {};


  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    private service: ClienteService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private nutricionistaS: NutricionistaService) { 
  } 
  
  ngOnInit(): void {
    this.findAll()
    this.findById()
    
  } 

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!
    this.dataSource.sort = this.sort!

  }

  applyFilter(event: Event) {
    console.log(this.dataSource)
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    

    if (this.dataSource.paginator) {
      this.dataSource.paginator.initialized;
      this.dataSource.paginator.firstPage;
    }
  }


  findById() : void{
    this.nutricionistaS.findById(this.id_nut!).subscribe((resposta) => {
      this.nutricionista = resposta
      this.nomeNut = this.nutricionista.nomeCompleto!

    
    })
  }

  findAll(): void {
    this.id_nut = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.service.findAllByNutricionista(this.id_nut).subscribe((resposta) => {
      this.clientes = resposta;
      console.log(this.clientes)
      this.dataSource = new MatTableDataSource(this.clientes);
      this.dataSource.paginator = this.paginator!
      this.dataSource.sort = this.sort!
    })

  }

  navegarParaCriarCliente(): void {
    this.router.navigate([`nutricionista/${this.id_nut}/clientes/create`])
  }

}
