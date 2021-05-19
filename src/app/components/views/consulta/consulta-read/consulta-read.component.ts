import { Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../cliente/cliente.service';
import { ConsultaService } from '../consulta.service';
import { Nutricionista } from '../../tela-login/nutricionista.model';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConsultaCreateComponent } from '../consulta-create/consulta-create.component';
import { RefeicaoComponent } from '../../refeicao/refeicao.component';
import { SomaNutriente } from '../../refeicao/soma-nutriente.module';
import { RefeicaoService } from '../../refeicao/refeicao.service';
import { ItensService } from '../../refeicao/itens.service';
import { Item } from '../../refeicao/itens.model';

export interface ClienteData {
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
  consultas?: ConsultaData[]
}
export interface RefeicaoData  {
  codigo?: Number,
  tipoRefeicao?: String,
  horario?: String,
  index?: number
  somaCalorias?: number,
  somaGorduras?: number,
  somaCarboidratos?: number,
  somaProteinas?: number,
}
export interface ConsultaData {
  codigo?: number,
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
  cliente?: ClienteData,
  index?: number,
  carboidratosOfertados?: number,
  proteinasOfertadas?: number,
  gorduraOfertada?: number,
  vetValorEnergOfertado?: number
}

@Component({
  selector: 'app-consulta-read',
  templateUrl: './consulta-read.component.html',
  styleUrls: ['./consulta-read.component.css']
})
export class ConsultaReadComponent implements OnInit {

  id_nut: number = 0;
  id_cli: number = 0;
  id_con: Number = 0;
  cliente: ClienteData = {};
  consultas: ConsultaData[] = []; 
  consulta: ConsultaData = {};
  refeiçoesData: RefeicaoData[] = [];
  refeiçao: RefeicaoData = {};
  cont: number = 0;
  indexConsulta: number = 0;
  indexrefeicao: number = 0;
  indexRefeicao2: number =0;
  inProgress = false
  totalCalorias:number = 0;
  totalGorduras:number = 0;
  totalCarboidratos:number = 0;
  totalProteinas:number = 0;

  constructor(
    private serviceCliente: ClienteService, 
    private serviceConsulta: ConsultaService,
    private serviceRefeicao: RefeicaoService,
    private serviceItem: ItensService,
    private route: ActivatedRoute, 
    private router: Router,
    public dialog: MatDialog,
    ) { } 
  
  ngOnInit(): void {
    this.id_cli = parseInt(this.route.snapshot.paramMap.get('id_cli')!);
    this.id_nut = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.serviceConsulta.findAllByCliente(this.id_cli!).subscribe( resposta => {
      this.consultas = resposta;
      if(this.consultas.length == 0){
        this.createDialog();
      }else{
        this.findAll()
        this.findById()
      }
    })
  }

  somasTotais(){

    this.serviceRefeicao.findAllByConsulta(this.id_con!).subscribe( resposta =>{
      resposta.forEach(refeicao => {
        this.serviceItem.findAllByRefeicao(refeicao.codigo!).subscribe( itens =>{
          console.log(this.somaPorItemEnergia(itens))
        })
      }); 
    })

  }

  somaPorItemEnergia(itens: Item[]): number{
    let soma: number = 0;

    itens.forEach(item => {
      if (item.alimentoTaco!.energiaKcal! == 'NaN'){
        item.alimentoTaco!.energiaKcal! = '0'
      }
      soma += parseInt(item.alimentoTaco!.energiaKcal!) * item.quantidade!
    });

    return soma
  }

  somaPorItemProteina(itens: Item[]): number{
    let soma: number = 0;

    itens.forEach(item => {

      if (item.alimentoTaco!.proteina! == "NaN"){
        item.alimentoTaco!.proteina! = "0"
        console.log(item.alimentoTaco!.proteina!)
      }
      soma += parseInt(item.alimentoTaco!.proteina!) * item.quantidade!
    });

    return soma
  }

  somaPorItemCarboidrato(itens: Item[]): number{
    let soma: number = 0;

    itens.forEach(item => {
      if (item.alimentoTaco!.carboidrato! == 'NaN'){
        item.alimentoTaco!.carboidrato! = '0'
      }
      soma += parseInt(item.alimentoTaco!.carboidrato!) * item.quantidade!
    });

    return soma
  }

  somaPorItemGordura(itens: Item[]): number{
    let soma: number = 0;

    itens.forEach(item => {
      if (item.alimentoTaco!.lipideos! == 'NaN'){
        item.alimentoTaco!.lipideos! = '0'
      }
      soma += parseInt(item.alimentoTaco!.lipideos!) * item.quantidade!
    });

    return soma
  }

  /*     this.itensArray.forEach( item => {
        item.somaNutriente!.somaEnergia! = parseInt(item.alimentoTaco!.energiaKcal!) * item.quantidade!
      });
      console.log("imprimindo a soma decalorias")
      console.log(this.itensArray)
 contEnergia += parseInt(item.alimentoTaco!.energiaKcal!) */


  findById() : void{
    this.serviceCliente.findById(this.id_cli!).subscribe((resposta) => {
      this.cliente = resposta
    })

  }

  findAll(): void {
    this.id_cli = parseInt(this.route.snapshot.paramMap.get('id_cli')!);
    this.id_nut = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.serviceConsulta.findAllByCliente(this.id_cli!).subscribe((resposta) => {
      if (this.consultas.length == 0){
        this.inProgress = true
      }else{
        this.inProgress = false
      }
      
      this.consultas = resposta;
      console.log(this.consultas)
      this.consulta = this.consultas[this.consultas.length-1]
      this.id_con = this.consulta.codigo!
      console.log(this.id_con)
      this.indexConsulta = this.consultas.length
      console.log(this.consulta)

      if (this.consultas.length == 0){
        this.inProgress = true
      }else{
        this.serviceRefeicao.findAllByConsulta(this.id_con!).subscribe( resposta =>{
          this.refeiçoesData = resposta
          this.indexrefeicao = this.refeiçoesData.length
          this.indexRefeicao2 = 0;
          this.refeiçoesData.forEach(refeicao => {
            this.indexRefeicao2++;
            refeicao.index = this.indexRefeicao2;
            this.serviceItem.findAllByRefeicao(refeicao.codigo!).subscribe( itens =>{
              console.log(refeicao.tipoRefeicao);
              console.log(refeicao.index)
              refeicao.somaCalorias = this.somaPorItemEnergia(itens)
              refeicao.somaCarboidratos = this.somaPorItemCarboidrato(itens)
              refeicao.somaGorduras = this.somaPorItemGordura(itens)
              refeicao.somaProteinas = this.somaPorItemProteina(itens)

              console.log(refeicao.somaCalorias)  
              this.totalCalorias += refeicao.somaCalorias
              this.totalCarboidratos += refeicao.somaCarboidratos
              this.totalProteinas += refeicao.somaProteinas
              this.totalGorduras += refeicao.somaGorduras
             // console.log(this.somaPorItem(itens))

            })
          }); 
        })
      }


    })
  }
  
  createDialog(): void{
    this.dialog.open(ConsultaCreateComponent, {
      data: {id_cli: this.id_cli, id_nut: this.id_nut}
    });
  }

  delete(): void {
    this.serviceConsulta.delete(this.consulta.codigo!).subscribe((resposta) => {
      
        this.serviceConsulta.mensagem('Consulta deletada com sucesso!')
        console.log(this.consulta)
        window.location.reload()
      }, err => {
        for (let i = 0; i < err.error.errors.length; i++){
          this.serviceConsulta.mensagem(err.error.errors[i].message)
        }

        console.log(err.errors.erro)
        console.log(this.consulta)

    })
    
  }

  update(): void {
    this.serviceConsulta.update(this.consulta).subscribe((resposta) => {
      
        this.serviceConsulta.mensagem('Consulta atualizada com sucesso!')
        console.log(this.consulta)
        console.log(resposta)
        this.consulta = resposta
        
      }, err => {
        for (let i = 0; i < err.error.errors.length; i++){
          this.serviceConsulta.mensagem(err.error.errors[i].message)
        }

        console.log(err.errors.erro)
        console.log(this.consulta)

    })
    
  }

  abrirRefeicoes(): void{
    this.dialog.open(RefeicaoComponent, {
      data: this.consulta
    });
  }

  setaDireita(): void{
    ++this.indexConsulta
    this.consulta = this.consultas[this.indexConsulta -1]
  }

  desabilitaDireita(): boolean{
    if(this.indexConsulta == this.consultas.length){
      return true
    }
    return false
  }

  cancel(): void {
    this.router.navigate([`nutricionista/${this.id_nut}/clientes`]);
  }
  
  setaEsquerda(): void{
    --this.indexConsulta
    this.consulta = this.consultas[this.indexConsulta -1]
  
  }

  desabilitaEsquerda(): boolean{
    if(this.indexConsulta == 1){
      return true
    }

    return false
  }

  navegarParaCriarConsulta(): void {
    this.router.navigate([`nutricionista/${this.id_cli}/consultas/create`])
  }

}