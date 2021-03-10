import { Nutricionista } from "../tela-login/nutricionista.model";

export interface Cliente {
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