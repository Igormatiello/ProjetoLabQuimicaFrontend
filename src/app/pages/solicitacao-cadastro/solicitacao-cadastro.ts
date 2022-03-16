import { Cidade } from "../cidade/cidade";

export class SolicitacaoCadastro {
    id: number;
    senha: string;
    tipoPessoa: string;
    cidade: Cidade;
    nome: string;
    documento: string;
    cep: string;
    endereco: string;
    bairro: string;
    numero: number;
    complemento: string;
    telefone: string;
    celular: string;
    email: string;
    nomeInstituicao: string;
    cpfOrientador: string;
    status: string;
    ehProfessor: boolean;
    nomeProgramaEnsino: string;
    dataTerminoProgramaEnsino: string;
    inscricaoEstadual: string;
    nomeprojeto: string;
}
