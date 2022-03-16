import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VinculoPessoaInstituicaoListComponent } from './vinculo-pessoa-instituicao-list/vinculo-pessoa-instituicao-list.component';
import {DropdownModule} from "primeng/dropdown";
import {TableModule} from "primeng/table";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [VinculoPessoaInstituicaoListComponent],
    imports: [
        CommonModule,
        DropdownModule,
        TableModule,
        FormsModule
    ],
    exports: [
        VinculoPessoaInstituicaoListComponent
    ]
})
export class VinculoPessoaInstituicaoModule { }
