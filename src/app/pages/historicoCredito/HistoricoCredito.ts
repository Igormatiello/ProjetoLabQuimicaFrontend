import { Pessoa } from '../pessoa/pessoa';

export class HistoricoCredito {
    id?: number;
    pessoa: Pessoa;
    nomeProjeto: string;
    creditoProfessor: number
    dataProjeto: string;
    dataAtualizacao: string;
    valorPago: number;
}
