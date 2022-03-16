import { Equipamento } from "../equipamento/Equipamento";
import { Pessoa } from "../pessoa/pessoa";
import { Vinculo } from "../vinculo/vinculo";
import { Serviico } from "../equipamento/serviico";
import { CreditoProfessor } from '../creditoProfessor/creditoProfessor';

export class Formulario {
    id?: number;
    pessoa: Pessoa;
    professor: Pessoa;
    creditoProfessor: CreditoProfessor;
    participacaoPrograma: Vinculo;
    equipamento: Equipamento;
    servico: Serviico;
    dataSolicitacao: any;
    nomeProgramaEnsino: string;
    naturezaProjeto: string;
    nomeServico: string;
    metodologia: string;
    status: string;
    motivoRecusaAmostra: string;
    emailEnviadoSolicitante: string;
    emailEnviadoFuntef: boolean;
    numeroAmostras: number;
    laudo: string;
    analise: boolean;
}
