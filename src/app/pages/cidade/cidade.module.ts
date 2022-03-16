import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CidadeFormComponent } from './cidade-form/cidade-form.component';
import { CidadeListComponent } from './cidade-list/cidade-list.component';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    CidadeFormComponent,
    CidadeListComponent
  ],
    imports: [
        CommonModule,
        DialogModule,
        DropdownModule,
        TableModule,
        ReactiveFormsModule,
        RouterModule
    ],
  exports: [
    CidadeFormComponent,
    CidadeListComponent
  ]
})
export class CidadeModule { }
