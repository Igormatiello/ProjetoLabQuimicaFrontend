import {Instituicao} from "../instituicao/instituicao";
import {Pessoa} from "../pessoa/pessoa";

export class PessoaInstituicao {
    id: number;
    instituicao: Instituicao;
    pessoa: Pessoa;
    ehAtivo: boolean;
    creditoVigente: number;
    ehProfessor: boolean;
}
