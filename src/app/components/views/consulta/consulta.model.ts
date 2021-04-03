import { Cliente } from "../cliente/cliente.model";

export interface Consulta {
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
    cliente?: Cliente
}