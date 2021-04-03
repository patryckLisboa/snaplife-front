import { Consulta } from "./consulta.model";

export interface PrescricaoDietetica  {
    codigo?: Number,
    objetivo?: String,
    gorduraOfertada?: Number,
    carboidratosOfertados?: Number,
    proteinasOfertadas?: Number,
    anotacao?: String,
    vetValorEnergOfertado?: Number, 
    consulta?: Consulta,
}