import { Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../cliente/cliente.service';
import { ConsultaService } from '../consulta.service';
import { Nutricionista } from '../../tela-login/nutricionista.model';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Consulta } from '../consulta.model';

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
  cliente?: ClienteData,
  index?: number,
  carboidratosOfertados?: number,
  proteinasOfertadas?: number,
  gorduraOfertada?: number,
  vetValorEnergOfertado?: number
}
export interface DialogData {
  id_cli: number;
  id_nut: number;
}

@Component({
  selector: 'app-consulta-create',
  templateUrl: './consulta-create.component.html',
  styleUrls: ['./consulta-create.component.css']
})
export class ConsultaCreateComponent implements OnInit {


  id_con: Number = 0;

  cliente: ClienteData = {};
  consultas: Consulta[] = []; 
  consulta: Consulta = {};

  constructor(
    private serviceCliente: ClienteService, 
    private serviceConsulta: ConsultaService,
    private route: ActivatedRoute, 
    private router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ConsultaCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { } 
  
  ngOnInit(): void {
    this.findAll()
  }

  findById() : void{


  }


  findAll(): void {

    console.log("id do cliente e do nut:")
    console.log(this.data.id_cli)
    console.log(this.data.id_nut)
    this.serviceCliente.findById(this.data.id_cli).subscribe((resposta) => {
   
      this.cliente = resposta
    })
  }
  createTeste(): void{
    this.serviceConsulta.mensagem('Consulta criada com sucesso!')
    console.log(this.consulta)
  }
  create(): void {
    this.serviceConsulta.create(this.consulta, this.data.id_cli).subscribe((resposta) => {
      
        this.serviceConsulta.mensagem('Consulta criada com sucesso!')
        console.log(resposta)
        console.log(this.consulta)
        this.cancel();
        window.location.reload()
      }, err => {
        for (let i = 0; i < err.error.errors.length; i++){
          this.serviceConsulta.mensagem(err.error.errors[i].message)
        }

        console.log(err.errors.erro)
        console.log(this.cliente)

    })
    
  }
  cancel(): void {
      
    this.dialogRef.close();
  
  }
  
}
