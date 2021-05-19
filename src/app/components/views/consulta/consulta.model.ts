import { Cliente } from "../cliente/cliente.model";

export interface Consulta {
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
    cliente?: Cliente,
    carboidratosOfertados?: number,
    proteinasOfertadas?: number,
    gorduraOfertada?: number,
    vetValorEnergOfertado?: number
}