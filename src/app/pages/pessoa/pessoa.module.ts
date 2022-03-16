import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PessoaListComponent} from './pessoa-list/pessoa-list.component';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {ReactiveFormsModule} from '@angular/forms';
import {MultiSelectModule} from 'primeng/multiselect';
import { PessoaFormComponent } from './pessoa-form/pessoa-form.component';
import {RouterModule} from '@angular/router';
import {InputMaskModule} from 'primeng/inputmask';
import { PerfilComponent } from '../perfil/perfil.component';


@NgModule({
    declarations: [PessoaListComponent, PessoaFormComponent],
    exports: [PessoaListComponent, PessoaFormComponent],
    imports: [
        CommonModule,
        DialogModule,
        DropdownModule,
        TableModule,
        ReactiveFormsModule,
        MultiSelectModule,
        RouterModule,
        InputMaskModule
    ]
})
export class PessoaModule {
}
