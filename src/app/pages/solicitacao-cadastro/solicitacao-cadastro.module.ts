import { NgModule } from "@angular/core";
import { SolicitacaoCadastroUsuarioComponent } from "../solicitacao-cadastro/form-usuario/solicitacao-cadastro-usuario.component";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CalendarModule } from "primeng/calendar";
import { StepsModule } from "primeng/steps";
import { CardModule } from "primeng/card";
import { SelectButtonModule } from "primeng/selectbutton";
import { PasswordModule } from "primeng/password";
import { ToastModule } from "primeng/toast";
import { InputMaskModule } from "primeng/inputmask";
import { CommonModule } from "@angular/common";
import { SolicitacaoCadastroListComponent } from "./solicitacao-cadastro-list/solicitacao-cadastro-list.component";
import { TableModule } from "primeng/table";
import {SolicitacaoCadastroFormComponent} from "./solicitacao-cadastro-form/solicitacao-cadastro-form.component";
import {FieldsetModule} from "primeng/fieldset";

@NgModule({
    declarations: [
        SolicitacaoCadastroListComponent,
        SolicitacaoCadastroFormComponent,
        SolicitacaoCadastroUsuarioComponent
    ],
    imports: [
        CommonModule,
        TableModule,
        CommonModule,
        DialogModule,
        DropdownModule,
        TableModule,
        ReactiveFormsModule,
        CalendarModule,
        StepsModule,
        CardModule,
        PasswordModule,
        SelectButtonModule,
        FormsModule,
        ToastModule,
        ReactiveFormsModule,
        InputMaskModule,
        FieldsetModule
    ],
    exports: [
        SolicitacaoCadastroListComponent,
        SolicitacaoCadastroFormComponent,
        SolicitacaoCadastroUsuarioComponent
    ]
})
export class SolicitacaoCadastroModule {}
