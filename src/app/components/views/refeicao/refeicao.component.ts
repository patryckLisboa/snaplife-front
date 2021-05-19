import { ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Cliente } from '../cliente/cliente.model';
import { Consulta } from '../consulta/consulta.model';
import { RefeicaoService } from './refeicao.service';
import { Refeicao } from './refeicao.model';
import { ConsultaService } from '../consulta/consulta.service';
import { Item } from './itens.model';
import { ItensService } from './itens.service';
import { AlimentoComponent } from '../alimento/alimento.component';
import { SomaNutriente } from './soma-nutriente.module';


export interface ConsultaData {
  codigo?: Number,
  dataConsulta?: Date,
  historicoSocialFamiliar?: String,
  peso?: Number,
  altura?: Number,
  idade?: Number,
  sexo?: String, 
  estadoCorporal?: String,
  fatorAtividade?: Number,
  taxaMB?: Number,
  diagnostico?: String,
  gastoEnergTot?: number,
  prescricao?: String,
  cliente?: Cliente,
  index?: number
}

export interface DialogData {
  codigo?: Number,
  dataConsulta?: Date,
  historicoSocialFamiliar?: String,
  peso?: Number,
  altura?: Number,
  idade?: Number,
  sexo?: String, 
  estadoCorporal?: String,
  fatorAtividade?: Number,
  taxaMB?: Number,
  diagnostico?: String,
  gastoEnergTot?: number,
  prescricao?: String,
  cliente?: Cliente,    
  carboidratosOfertados?: number,
  proteinasOfertadas?: number,
  gorduraOfertada?: number,
  vetValorEnergOfertado?: number,
  index?: number
}


@Component({
  selector: 'app-refeicao',
  templateUrl: './refeicao.component.html',
  styleUrls: ['./refeicao.component.css']
})
export class RefeicaoComponent implements OnInit {

  id_con: Number = 0;
  refeicoes: Refeicao[] = [];
  itensArray: Item[] = [];
  somaNutrientes: SomaNutriente = {};

  item: Item = {
    alimentoTaco:{
      numeroAlimento: "200"
    },
    quantidade: 0
  };
  refeicao: Refeicao ={
    tipoRefeicao:  "jantar",
    horario: "10:11",

  };
  displayedColumns: string[] = ['refeicao'];
  displayedColumns2: string[] = ['item'];
  panelOpenState = false;

  constructor(
    private serviceRefeicao: RefeicaoService,
    private serviceIten: ItensService,
    private route: ActivatedRoute, 
    private router: Router,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    public dialogRef: MatDialogRef<RefeicaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { } 
  
  ngOnInit(): void {
    this.findAll()
  }

  findById() : void{


  }

  findAll(): void {
    this.serviceRefeicao.findAllByConsulta(this.data.codigo!).subscribe((resposta) => {
      this.refeicoes = resposta
    })
  }

  createTeste(): void{
    this.serviceRefeicao.mensagem('refeicao criada com sucesso!')
    console.log(this.data)
  }


  create(): void {
    this.serviceRefeicao.create(this.refeicao, this.data.codigo!).subscribe((resposta) => {
      
        this.serviceRefeicao.mensagem('refeicao criada com sucesso!')
        console.log(resposta)
        console.log(this.refeicao)
        this.findAll()
      
      }, err => {
        for (let i = 0; i < err.error.errors.length; i++){
          this.serviceRefeicao.mensagem(err.error.errors[i].message)
        }

        console.log(err.errors.erro)
      
    })
     
  }

  update(refeicao: Refeicao): void{
    this.serviceRefeicao.update(refeicao).subscribe((resposta)=>{
      this.serviceRefeicao.mensagem("refeicao atualizado com sucesso!")
      console.log(refeicao)
      this.findAll()
      
    }, err=>{
      this.serviceRefeicao.mensagem("erro ao atualizar refeicao")
      console.log(refeicao)
      for (let i = 0; i < err.error.errors.length; i++){
        this.serviceRefeicao.mensagem(err.error.errors[i].message)
      }
     
    })
  }

  delete(refeicao: Refeicao): void{
    this.serviceRefeicao.delete(refeicao.codigo!).subscribe((resposta)=>{
      this.serviceRefeicao.mensagem("refeicao deletada com sucesso!")
      this.findAll()
    }, err=> {
      this.serviceRefeicao.mensagem("Erro ao deletar refeicao!")
      console.log(err.errors.erro)
      console.log(refeicao)
    })
  }

  cancel(): void {
    window.location.reload()
    this.dialogRef.close();
  
  }


  // itens: 
  refreshItens(codigo: number): void{
    this.serviceIten.findAllByRefeicao(codigo).subscribe((resposta) => {
      this.itensArray = resposta
    })
  }

 /*     this.itensArray.forEach( item => {
        item.somaNutriente!.somaEnergia! = parseInt(item.alimentoTaco!.energiaKcal!) * item.quantidade!
      });
      console.log("imprimindo a soma decalorias")
      console.log(this.itensArray)
 contEnergia += parseInt(item.alimentoTaco!.energiaKcal!) */

  itens(refeicao: Refeicao): Item[]{
    this.refreshItens(refeicao.codigo!)
    return this.itensArray
  }
  

  itensCreate(refeicao : Refeicao): void {
    this.serviceIten.create(this.item, refeicao.codigo!).subscribe((resposta) => {
      
        this.serviceIten.mensagem('item criado com sucesso!')
        console.log(resposta)
        console.log(this.item)
        this.refreshItens(refeicao.codigo!)
      
      }, err => {
        for (let i = 0; i < err.error.errors.length; i++){
          this.serviceIten.mensagem(err.error.errors[i].message)
        }

        console.log(err.errors.erro)
      
    })
  }

  
  itensUpdate(item: Item, refeicao: Refeicao): void {
    this.serviceIten.update(item).subscribe((resposta) => {
      
        this.serviceIten.mensagem('item editado com sucesso!')
        console.log(resposta)
        console.log(item)
        this.refreshItens(refeicao.codigo!)
      
      }, err => {
        for (let i = 0; i < err.error.errors.length; i++){
          this.serviceIten.mensagem(err.error.errors[i].message)
        }

        console.log(err.errors.erro)
      
    })
  }

  excluirItem(item: Item, refeicao: Refeicao): void{
    this.serviceIten.delete(item.codigo!).subscribe((resposta)=>{
      this.serviceIten.mensagem("Item deletado com sucesso!")
      this.refreshItens(refeicao.codigo!)
    }, err=> {
      this.serviceIten.mensagem("Erro ao deletar item!")
      console.log(err.errors.erro)
      console.log(item)
    })
  }


  // alimento

  mudarAlimento(item : Item): void{
    this.dialog.open(AlimentoComponent, {
      data: item
    });
    
  }
}
