import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstituicaoFormComponent } from './instituicao-form/instituicao-form.component';
import { InstituicaoListComponent } from './instituicao-list/instituicao-list.component';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    InstituicaoFormComponent,
    InstituicaoListComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    DropdownModule,
    TableModule,
    ReactiveFormsModule,
    MultiSelectModule,
    RouterModule
  ],
  exports: [
    InstituicaoListComponent,
    InstituicaoFormComponent
  ]
})
export class InstituicaoModule { }
