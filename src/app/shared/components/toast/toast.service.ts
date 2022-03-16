import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/api';

import { Severidade } from '../../consts/error-severity.enum';

import { Toast } from './toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  constructor(private messageService: MessageService) { }


  showError(titulo: string, detalhes: string, duracao?: number, closable?: boolean) {
    this.showMessage(Severidade.ERROR, titulo, detalhes, duracao, closable);
  }

  showInfo(titulo: string, detalhes: string, duracao?: number, closable?: boolean) {
    this.showMessage(Severidade.INFO, titulo, detalhes, duracao, closable);
  }

  showSuccess(titulo: string, detalhes: string, duracao?: number, closable?: boolean) {
    this.showMessage(Severidade.SUCESSO, titulo, detalhes, duracao, closable);
  }

  showWarn(titulo: string, detalhes: string, duracao?: number, closable?: boolean) {
    this.showMessage(Severidade.WARN, titulo, detalhes, duracao, closable);
  }

  private showMessage(severidade: Severidade, titulo: string, detalhes: string, duracao: number = 3500, closable = true) {
    this.messageService.add({
      severity: severidade,
      summary: titulo,
      detail: detalhes,
      life: duracao,
      closable
    });
  }

  showMultiple(...toasts: Toast[]) {
    this.messageService.addAll(
      toasts.map(toast => ({
        severity: toast.severidade,
        summary: toast.titulo,
        detail: toast.detalhes,
        life: toast.duracao,
        closable: toast.closable
      }))
    );
  }

  clear() {
    this.messageService.clear();
  }

}
