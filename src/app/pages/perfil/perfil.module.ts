import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {ReactiveFormsModule} from '@angular/forms';
import {MultiSelectModule} from 'primeng/multiselect';
import {RouterModule} from '@angular/router';
import {InputMaskModule} from 'primeng/inputmask';
import { PerfilComponent } from './perfil.component';


@NgModule({
    declarations: [PerfilComponent],
    exports: [PerfilComponent],
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
export class PerfilModule {
}
