import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Consulta } from '../consulta.model';
import { ClienteService } from '../../cliente/cliente.service';
import { ConsultaService } from '../consulta.service';
import { Nutricionista } from '../../tela-login/nutricionista.model';
import { Cliente } from '../../cliente/cliente.model';
import { PrescricaoService } from '../prescricao.service';
import { PrescricaoDietetica } from '../prescricao.model';
import { RefeicaoService } from '../refeicao.service';
import { Refeicao } from '../refeicao.model';
import { ItemService } from '../item.service';
import { AlimentoService } from '../alimento.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, catchError, startWith } from 'rxjs/operators';

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
}

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
  cliente?: Cliente,
  index?: number
}

export interface PrescricaoData  {
  codigo?: Number,
  objetivo?: String,
  gorduraOfertada?: Number,
  carboidratosOfertados?: Number,
  proteinasOfertadas?: Number,
  anotacao?: String,
  vetValorEnergOfertado?: Number, 
  consulta?: Consulta,
}

export interface RefeicaoData  {
  codigo?: Number,
  tipoRefeicao?: String,
  horario?: String,
  prescricaoDietetica?: PrescricaoDietetica,
  index?: number
}

export interface ItemData  {
  codigo?: Number,
  quantidade?: Number,
  alimentoTaco?: AlimentoTacoData,
  refeicao?: Refeicao,
  index?: number
}

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
  selector: 'app-consulta-read',
  templateUrl: './consulta-read.component.html',
  styleUrls: ['./consulta-read.component.css']
})
export class ConsultaReadComponent implements OnInit {

  id_nut: number = 0;
  id_cli: number = 0;
  id_con: Number = 0;
  id_pres: Number = 0;
  id_ref: Number = 0;
  id_item: Number = 0;
  cliente: ClienteData = {};
  consultas: ConsultaData[] = []; 
  consulta: ConsultaData = {};
  prescricoes: PrescricaoData[] = [];
  prescricao: PrescricaoData = {}; 
  refeicoes: RefeicaoData[] = [];
  refeicao: RefeicaoData = {}; 
  itens: ItemData[] = [];
  item: ItemData = {}; 
  alimentos: AlimentoTacoData[] = [];


  displayedColumns: string[] = ['refeicao'];
  displayedColumns2: string[] = ['item'];

  myControl = new FormControl();
  filteredOptions!: Observable<AlimentoTacoData[]>


  indexConsulta: number = 0;
  indexPrescricao: number = 0;
  indexrefeicao: number = 0;
  indexItem: number = 0;
  indexRefeicao2: number =0;
  inProgress = false
  html_string = "";
  temp: string = "";
  temp2: string = "";
  @ViewChild("alimento") alimento: any; 

  constructor(
    private serviceCliente: ClienteService, 
    private serviceConsulta: ConsultaService,
    private servicePrescricao: PrescricaoService,
    private serviceRefeicao: RefeicaoService,
    private serviceItem: ItemService,
    private serviceAlimento: AlimentoService,
    private route: ActivatedRoute, 
    private router: Router,
    ) { } 
  
  ngOnInit(): void {
    this.serviceAlimento.findAll().subscribe((resposta)=>{
      this.alimentos = resposta;
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.descricaoAlimento),
        map(descricaoAlimento => descricaoAlimento ? this._filter(descricaoAlimento) : resposta.slice())
      );
      
      console.log(this.html_string)
      //this.temp = this.alimento.nativeElement.value;
      console.log(this.temp)

    })
    
    this.findAll()
    this.findById()
  }

  displayFn(alimento: AlimentoTacoData): string {


    return alimento && alimento.descricaoAlimento ? alimento.descricaoAlimento : '';
  
  }

  retornarObj(): void{
    console.log(this.temp)
    console.log(this.item)
  }


  private _filter(name: string): AlimentoTacoData[] {
    const filterValue = name.toLowerCase();

    return this.alimentos.filter(option => option.descricaoAlimento!.toLowerCase().indexOf(filterValue) === 0);
  }

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
        this.inProgress = false
      }

      this.servicePrescricao.findAllByConsulta(this.id_con).subscribe((resposta) =>{
        this.prescricoes = resposta;
        console.log(this.prescricoes)
        this.prescricao = this.prescricoes[this.prescricoes.length-1]
        this.id_pres = this.prescricao.codigo!;
        this.indexPrescricao = this.prescricoes.length

        this.serviceRefeicao.findAllByPrescricao(this.id_pres).subscribe((resposta) =>{
          this.refeicoes = resposta;
          this.refeicao = this.refeicoes[this.refeicoes.length-1]
          this.indexrefeicao = this.refeicoes.length
          this.id_ref = this.refeicao.codigo!;
          this.indexRefeicao2 = 0;
          this.refeicoes.forEach((refeicao)=>{
            this.indexRefeicao2++;
            refeicao.index = this.indexRefeicao2;
          })

          this.serviceItem.findAllByRefeicao(this.id_ref).subscribe((resposta)=>{
            this.itens = resposta;
            this.item = this.itens[this.itens.length-1]
            this.id_item = this.item.codigo!;
            this.indexItem = 0
            this.itens.forEach((item)=>{
              this.indexItem++;
              item.index = this.indexItem;
            })


          })
        })
      })
    })

   
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
