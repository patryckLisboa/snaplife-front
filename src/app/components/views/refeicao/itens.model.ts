
import { AlimentoTaco } from "./alimento-taco.module";
import { Refeicao } from "./refeicao.model";
import { SomaNutriente } from './soma-nutriente.module';

export interface Item  {
    codigo?: number,
    quantidade?: number,
    alimentoTaco?: AlimentoTaco,
    refeicao?: Refeicao,
    somaNutriente?: SomaNutriente
}