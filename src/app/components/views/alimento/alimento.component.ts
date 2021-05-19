import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AlimentoTaco } from '../refeicao/alimento-taco.module';
import { AlimentoTacoService } from '../refeicao/alimento-taco.service';
import { Item } from '../refeicao/itens.model';
import { ActivatedRoute, Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import { Nutricionista } from '../tela-login/nutricionista.model';
import { NutricionistaService } from '../tela-login/nutricionista.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Cliente } from '../cliente/cliente.model';
import { ClienteService } from '../cliente/cliente.service';
import { ItensService } from '../refeicao/itens.service';


export interface AlimentoTacoData  {
  id?: String,
  categoria?: String,
  numeroAlimento?: String,
  descricaoAlimento?: string,
  unidade?: String,
  energiaKcal?: String,
  energiaKj?: String,
  proteina?: String,
  lipideos?: String,
  colesterol?: String,
  carboidrato?: String,
  fibraAlimentar?: String,
  cinzas?: String,
  calcio?: String,
  magnesio?: String,
  fosforo?: String,
  ferro?: String,
  sodio?: String,
  potassio?: String,
  cobre?: String,
  zinco?: String,
  retinol?: String,
  re?: String,
  rae?: String,
  tiamina?: String,
  riboflavina?: String,
  piridoxina?: String,
  niacina?: String,
  vitamin?: String,
  created_at?: String,
  updated_at?: String,   
}

@Component({
  selector: 'app-alimento',
  templateUrl: './alimento.component.html',
  styleUrls: ['./alimento.component.css']
})
export class AlimentoComponent implements OnInit {

  alimentos: AlimentoTacoData[] = [] 
  displayedColumns: string[] = ['numeroAlimento','descricaoAlimento','unidade', 'energiaKcal', 'proteina','carboidrato', 'lipideos']; 
  dataSource: MatTableDataSource<AlimentoTacoData> = new MatTableDataSource(this.alimentos);

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    private alimentoService: AlimentoTacoService,
    private itemservice: ItensService,
    public dialogRef: MatDialogRef<AlimentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item) { }
  
  ngOnInit(): void {
    this.buscaAlimentos();
    
  } 

  buscaAlimentos(): void{
    this.alimentoService.findAll().subscribe((resposta) =>{
      this.alimentos = resposta;
      this.dataSource = new MatTableDataSource(this.alimentos);
      this.dataSource.paginator = this.paginator!
      this.dataSource.sort = this.sort!
    })
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

  cancel(): void {
      
    this.dialogRef.close();
  
  }

  selecionaAlimento(alimento: AlimentoTaco): void{
    this.data.alimentoTaco = alimento;
    this.itemservice.update(this.data).subscribe(resposta =>{
      this.itemservice.mensagem("Item atualizado com sucesso!")
      console.log(this.data)
      this.cancel()
    }, err => {
      this.itemservice.mensagem("Erro ao atualizar Item.")
      for (let i = 0; i < err.error.errors.length; i++){
        this.itemservice.mensagem(err.error.errors[i].message)
      }
      console.log(this.data)
    })
  }
}
