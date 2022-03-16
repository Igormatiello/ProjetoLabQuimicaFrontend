import { Pessoa } from '../../pessoa/pessoa';
import {Formulario} from "../../formulario/formulario";

export class HistoricoFinanceiro {
    id?: number;
    dataPagamento: string;
    numeroAnalise: string;
    valor: number;
    formulario: Formulario;
}
