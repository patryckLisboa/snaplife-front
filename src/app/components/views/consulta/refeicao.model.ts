import { PrescricaoDietetica } from "./prescricao.model";


export interface Refeicao  {
    codigo?: Number,
    tipoRefeicao?: String,
    horario?: String,
    prescricaoDietetica?: PrescricaoDietetica,
}