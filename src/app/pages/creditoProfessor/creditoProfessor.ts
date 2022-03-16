import { Pessoa } from '../pessoa/pessoa';

export class CreditoProfessor {
    id?: number;
    pessoa: Pessoa;
    dataInclusao: string;
    dataAtualizacao: string;
    nomeProjeto: string;
    valorCredito: number;
}
