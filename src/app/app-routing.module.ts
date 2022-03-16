import { HistoricoCreditoComponent } from './pages/historicoCredito/historicoCredito.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./pages/login/login.component";
import { LoginService } from "./pages/login/login.service";
import { CidadeFormComponent } from "./pages/cidade/cidade-form/cidade-form.component";
import { CidadeListComponent } from "./pages/cidade/cidade-list/cidade-list.component";
import { EquipamentoFormComponent } from "./pages/equipamento/equipamento-form/equipamento-form.component";
import { EquipamentoListaComponent } from "./pages/equipamento/equipamento-list/equipamento-list.component";
import { FormularioListUsuarioComponent } from "./pages/formulario/formulario-list-usuario/formulario-list-usuario.component";
import { FormularioEmEsperaListComponent } from "./pages/formulario/formulario-em-espera-list/formulario-em-espera-list.component";
import { InstituicaoFormComponent } from "./pages/instituicao/instituicao-form/instituicao-form.component";
import { InstituicaoListComponent } from "./pages/instituicao/instituicao-list/instituicao-list.component";
import { PessoaFormComponent } from "./pages/pessoa/pessoa-form/pessoa-form.component";
import { PessoaListComponent } from "./pages/pessoa/pessoa-list/pessoa-list.component";
import { PrgEnsinoFormComponent } from "./pages/programaEnsino/prg-ensino-form/prg-ensino-form.component";
import { PrgEnsinoListComponent } from "./pages/programaEnsino/prg-ensino-list/prg-ensino-list.component";
import { PerfilComponent } from './pages/perfil/perfil.component';
import { SolicitacaoCadastroUsuarioComponent } from "./pages/solicitacao-cadastro/form-usuario/solicitacao-cadastro-usuario.component";
import { SolicitacaoCadastroListComponent } from "./pages/solicitacao-cadastro/solicitacao-cadastro-list/solicitacao-cadastro-list.component";
import { VinculoFormComponent } from "./pages/vinculo/vinculo-form/vinculo-form.component";
import { VinculoListComponent } from "./pages/vinculo/vinculo-list/vinculo-list.component";
import { FormularioFormUsuarioComponent } from "./pages/formulario/formulario-form-usuario/formulario-form-usuario.component";
import { FormularioEmAnaliseListComponent } from "./pages/formulario/formulario-em-analise-list/formulario-em-analise-list.component";
import { FormularioFinalizadoListComponent } from "./pages/formulario/formulario-finalizado.list/formulario-finalizado-list.component";
import { VinculoPessoaInstituicaoListComponent } from "./pages/vinculo-pessoa-instituicao/vinculo-pessoa-instituicao-list/vinculo-pessoa-instituicao-list.component";
import { SolicitacaoCadastroFormComponent } from "./pages/solicitacao-cadastro/solicitacao-cadastro-form/solicitacao-cadastro-form.component";
import { AppReportComponent } from "./shared/components/app-report/app-report.component";
import {ConfEmailComponent} from "./pages/conf-email/conf-email.component";
import { CreditoProfessorComponent } from './pages/creditoProfessor/creditoProfessor.component';
import {HomeComponent} from "./pages/home/home.component";
import { HistoricoFinanceiroComponent } from "./pages/financeiro/historico-financeiro/historico-financeiro.component";
import { FormularioLaudoComponent } from './pages/formulario/formulario-laudo/formulario-laudo.component';

const routes: Routes = [
    {
        path: "",
        canActivate: [LoginService],
        children: [
            {
                path: "",
                component: HomeComponent,
                redirectTo: "",
                pathMatch: "full"
            },
            { path: "cidade", component: CidadeListComponent },
            { path: "cidade/novo", component: CidadeFormComponent },
            { path: "cidade/:id", component: CidadeFormComponent },
            { path: "pessoa", component: PessoaListComponent },
            { path: "pessoa/novo", component: PessoaFormComponent },
            { path: "pessoa/:id", component: PessoaFormComponent },
            { path: "instituicao", component: InstituicaoListComponent },
            { path: "instituicao/novo", component: InstituicaoFormComponent },
            { path: "instituicao/:id", component: InstituicaoFormComponent },
            { path: "equipamento", component: EquipamentoListaComponent },
            { path: "equipamento/novo", component: EquipamentoFormComponent },
            { path: "equipamento/:id", component: EquipamentoFormComponent },
            { path: "prgEnsino", component: PrgEnsinoListComponent },
            { path: "prgEnsino/novo", component: PrgEnsinoFormComponent },
            { path: "prgEnsino/:id", component: PrgEnsinoFormComponent },
            { path: "historicoCredito", component: HistoricoCreditoComponent },
            {
                path: "solicitacao-cadastro",
                component: SolicitacaoCadastroListComponent
            },
            {
                path: "solicitacao-cadastro/:id",
                component: SolicitacaoCadastroFormComponent
            },
            {
                path: "historico-formularios",
                component: FormularioListUsuarioComponent
            },
            {
                path: "novo-formulario",
                component: FormularioFormUsuarioComponent
            },
            {
                path: "formulario-em-espera",
                component: FormularioEmEsperaListComponent
            },
            {
                path: "formulario-em-analise",
                component: FormularioEmAnaliseListComponent
            },

            {
                path: "formulario-laudo",
                component: FormularioLaudoComponent
            },
                
            {
                path: "formulario-laudo/:id",
                component: FormularioLaudoComponent,
            },
            {
                path: "formulario-finalizado",
                component: FormularioFinalizadoListComponent
            },   



            { path: "pessoa", component: PessoaListComponent },
            { path: "pessoa/novo", component: PessoaFormComponent },
            { path: "pessoa/:id", component: PessoaFormComponent },
            { path: "perfil", component: PerfilComponent },
            { path: "vinculo", component: VinculoListComponent },
            { path: "vinculo/novo", component: VinculoFormComponent },
            { path: "vinculo/:id", component: VinculoFormComponent },
            {
                path: "pessoa-instituicao",
                component: VinculoPessoaInstituicaoListComponent
            },
            { path: "report-formulario/:id", component: AppReportComponent },
            { path: "conf-email", component: ConfEmailComponent },
            { path: "creditoProfessor", component: CreditoProfessorComponent },
            {
                path: "historico-financeiro",
                component: HistoricoFinanceiroComponent
            }
        ]
    },
    { path: "login", component: LoginComponent },
    { path: "registro", component: SolicitacaoCadastroUsuarioComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
// @ts-ignore
export class AppRoutingModule {}
