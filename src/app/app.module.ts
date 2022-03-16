import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { CheckboxModule } from "primeng/checkbox";
import { InputTextModule } from "primeng/inputtext";
import { KeyFilterModule } from "primeng/keyfilter";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthGuardService } from "./auth-guard.service";
import { HttpClientInterceptor } from "./http-client-interceptor";

import { CidadeModule } from "./pages/cidade/cidade.module";
import { EquipamentoModule } from "./pages/equipamento/equipamento.module";
import { FormularioModule } from "./pages/formulario/formulario.module";
import { InstituicaoModule } from "./pages/instituicao/instituicao.module";
import { LoginComponent } from "./pages/login/login.component";
import { LoginService } from "./pages/login/login.service";
import { VinculoModule } from "./pages/vinculo/vinculo.module";
import { PessoaModule } from "./pages/pessoa/pessoa.module";
import { PerfilModule } from "./pages/perfil/perfil.module";
import { VinculoPessoaInstituicaoModule } from "./pages/vinculo-pessoa-instituicao/vinculo-pessoa-instituicao.module";
import { PrgEnsinoModule } from "./pages/programaEnsino/prg-ensino.module";
import { SolicitacaoCadastroModule } from "./pages/solicitacao-cadastro/solicitacao-cadastro.module";
import { HistoricoCreditoModule } from './pages/historicoCredito/historicoCredito.module';
import { HeaderModule } from "./shared/components/header/header.module";
import { MenuModule } from "./shared/components/menu/menu.module";
import { MensagemModule } from "./shared/components/toast/toast.module";
import { FinanceiroModule } from "./pages/financeiro/financeiro.module";


//import ngx-print
import { NgxPrintModule } from "ngx-print";
import { AppReportModule } from "./shared/components/app-report/app-report.module";
import {ConfEmailModule} from "./pages/conf-email/conf-email.module";
import { CreditoProfessorModule } from './pages/creditoProfessor/creditoProfessor.module';
import {HomeModule} from "./pages/home/home.module";

@NgModule({
    declarations: [AppComponent, LoginComponent],
    imports: [
        BrowserModule, 
        CardModule,
        ToastModule,
        CheckboxModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        TableModule,
        ReactiveFormsModule,
        HeaderModule,
        MenuModule,
        CidadeModule,
        SolicitacaoCadastroModule,
        PrgEnsinoModule,
        InputTextModule,
        KeyFilterModule,
        EquipamentoModule,
        ButtonModule,
        MensagemModule,
        InstituicaoModule,
        PessoaModule,
        PerfilModule,
        VinculoPessoaInstituicaoModule,
        FormularioModule,
        VinculoModule,
        CreditoProfessorModule,
        HistoricoCreditoModule,
        AppReportModule,
        ConfEmailModule,
        HomeModule,
        FinanceiroModule
    ],
    providers: [
        MessageService,
        LoginService,
        AppComponent,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpClientInterceptor,
            multi: true
        },
        AuthGuardService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
