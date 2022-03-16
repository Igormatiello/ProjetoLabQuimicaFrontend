import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrgEnsinoFormComponent} from "./prg-ensino-form/prg-ensino-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {PrgEnsinoListComponent} from "./prg-ensino-list/prg-ensino-list.component";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {TableModule} from "primeng/table";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
      PrgEnsinoFormComponent,
      PrgEnsinoListComponent
  ],
    imports: [
        CommonModule,
        DialogModule,
        DropdownModule,
        TableModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports:[
        PrgEnsinoFormComponent,
        PrgEnsinoListComponent
    ]
})
export class PrgEnsinoModule { }
