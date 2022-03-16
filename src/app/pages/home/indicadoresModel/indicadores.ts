import {IndicadorCabecalho} from "./indicadorCabecalho";
import {IndicadorSolicitacaoCadastro} from "./indicadorSolicitacaoCadastro";
import {SolicitacaoCadastro} from "../../solicitacao-cadastro/solicitacao-cadastro";
import {IndicadorFormularioByDay} from "./indicadorFormularioByDay";

export class Indicadores {
    indicadorCabecalho: IndicadorCabecalho;
    indicadorSolicitacaoCadastroList: IndicadorSolicitacaoCadastro[];
    solicitacaoCadastrosPendentes: SolicitacaoCadastro[];
    indicadorFormularioByDayList: IndicadorFormularioByDay[];
}
