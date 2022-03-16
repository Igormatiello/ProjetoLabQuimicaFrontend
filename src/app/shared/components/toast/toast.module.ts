import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ToastModule } from 'primeng/toast';

import { ToastComponent } from './toast.component';

@NgModule({
  declarations: [ToastComponent],
  imports: [
    CommonModule,
    ToastModule
  ],
  exports: [
    ToastComponent
  ]
})
export class MensagemModule { }
