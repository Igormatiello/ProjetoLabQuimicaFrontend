import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { TableModule } from "primeng/table";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CalendarModule } from "primeng/calendar";
import { StepsModule } from "primeng/steps";
import { CardModule } from "primeng/card";
import { SelectButtonModule } from "primeng/selectbutton";
import { PasswordModule } from "primeng/password";
import { ToastModule } from "primeng/toast";
import { InputMaskModule } from "primeng/inputmask";
import { FormularioFormUsuarioComponent } from "./formulario-form-usuario/formulario-form-usuario.component";
import { FormularioFormComponent } from "./formulario-form/formulario-form.component";
import { FormularioListUsuarioComponent } from "./formulario-list-usuario/formulario-list-usuario.component";
import { FormularioEmEsperaListComponent } from "./formulario-em-espera-list/formulario-em-espera-list.component";
import { DialogModule } from "primeng/dialog";
import { InputTextareaModule } from "primeng/inputtextarea";
import { FormularioEmAnaliseListComponent } from "./formulario-em-analise-list/formulario-em-analise-list.component";
import { FormularioFinalizadoListComponent } from "./formulario-finalizado.list/formulario-finalizado-list.component";
import { DropdownModule } from "primeng/dropdown";
import { TooltipModule } from "primeng/tooltip";
import { FormularioLaudoComponent } from "./formulario-laudo/formulario-laudo.component";


import { KeyFilterModule } from "primeng/keyfilter";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import {FileUploadModule} from 'primeng/fileupload';
import { LabelValuePipe } from "src/app/shared/pipes/label-value.pipe";
import { LabelValuePipeModule } from "src/app/shared/pipes/label-value.pipe.module";
import { MultiSelectModule } from 'primeng/multiselect';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {RadioButtonModule} from 'primeng/radiobutton';

@NgModule({
    declarations: [
        FormularioFormComponent,
        FormularioListUsuarioComponent,
        FormularioFormUsuarioComponent,
        FormularioEmEsperaListComponent,
        FormularioEmAnaliseListComponent,
        FormularioFinalizadoListComponent,
        FormularioLaudoComponent
    ],
    imports: [
        CommonModule,
        DialogModule,
        DropdownModule,
        TableModule,
        CalendarModule,
        StepsModule,
        CardModule,
        PasswordModule,
        SelectButtonModule,
        FormsModule,
        ToastModule,
        ReactiveFormsModule,
        MultiSelectModule,
        ScrollPanelModule,
        InputMaskModule,
        KeyFilterModule,
        CKEditorModule,
        FileUploadModule,
        CommonModule,
        TableModule,
        LabelValuePipeModule,
        TooltipModule,
        CommonModule,
        InputTextareaModule,
        RadioButtonModule
        
    ],
    exports: [
        FormularioFormComponent,
        FormularioListUsuarioComponent,
        FormularioFormUsuarioComponent,
        FormularioEmEsperaListComponent,
        FormularioEmAnaliseListComponent,
        FormularioFinalizadoListComponent,
        FormularioLaudoComponent
    ]
})
export class FormularioModule {}
