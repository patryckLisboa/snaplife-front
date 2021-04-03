import { AlimentoTaco } from "./alimentoTaco.module";
import { Refeicao } from "./refeicao.model";


export interface Item  {
    codigo?: Number,
    quantidade?: Number,
    alimentoTaco?: AlimentoTaco,
    refeicao?: Refeicao,
}