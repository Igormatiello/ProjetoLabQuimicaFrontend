import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoricoFinanceiroComponent } from './historico-financeiro/historico-financeiro.component';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [HistoricoFinanceiroComponent],
  imports: [
      CommonModule,
      RouterModule,
      ReactiveFormsModule,
      DialogModule,
      TableModule,
      DropdownModule
  ],
    exports:[
        HistoricoFinanceiroComponent
    ]
})
export class FinanceiroModule { }
