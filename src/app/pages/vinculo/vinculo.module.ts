import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VinculoListComponent } from "./vinculo-list/vinculo-list.component";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";
import { ReactiveFormsModule } from "@angular/forms";
import { MultiSelectModule } from "primeng/multiselect";
import { RouterModule } from "@angular/router";
import { InputMaskModule } from "primeng/inputmask";
import { VinculoFormComponent } from "./vinculo-form/vinculo-form.component";
import { CalendarModule } from "primeng/calendar";

@NgModule({
    declarations: [VinculoListComponent, VinculoFormComponent],
    exports: [VinculoListComponent, VinculoFormComponent],
    imports: [
        CommonModule,
        DialogModule,
        DropdownModule,
        TableModule,
        ReactiveFormsModule,
        MultiSelectModule,
        RouterModule,
        InputMaskModule,
        CalendarModule
    ]
})
export class VinculoModule {}
