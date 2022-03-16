import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { CKEditorModule } from "@ckeditor/ckeditor5-angular";

import { TableModule } from "primeng/table";
import { DropdownModule } from "primeng/dropdown";
import { KeyFilterModule } from "primeng/keyfilter";

import { EquipamentoFormComponent } from "./equipamento-form/equipamento-form.component";
import { EquipamentoListaComponent } from "./equipamento-list/equipamento-list.component";
import { DialogModule } from "primeng/dialog";

@NgModule({
    declarations: [EquipamentoListaComponent, EquipamentoFormComponent],
    imports: [
        CommonModule,
        TableModule,
        ReactiveFormsModule,
        DropdownModule,
        KeyFilterModule,
        CKEditorModule,
        RouterModule,
        DialogModule
    ],
    exports: [EquipamentoListaComponent, EquipamentoFormComponent]
})
export class EquipamentoModule {}
