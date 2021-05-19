import { Cliente } from "../cliente/cliente.model";

export interface Refeicao  {
    codigo?: number,
    tipoRefeicao?: String,
    horario?: String,
    cliente?: Cliente,
}