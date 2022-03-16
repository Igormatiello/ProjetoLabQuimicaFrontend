import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { ArrayUtils } from 'src/app/shared/classes/ArrayUtils';

import { Equipamento } from '../Equipamento';
import { EquipamentoService } from '../equipamento.service';

@Component({
  selector: 'app-equipamento',
  templateUrl: './equipamento-list.component.html',
  styleUrls: ['./equipamento.component.css']
})
export class EquipamentoListaComponent implements OnInit {


  equipamentos: Equipamento[] = [];

  constructor(
    private equipamentoService: EquipamentoService,
    private router: Router,
    public route: ActivatedRoute,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.equipamentoService.findAll().subscribe(equipamentos => {
      this.equipamentos = equipamentos;
      ArrayUtils.sortByPropriedade({ lista: this.equipamentos, propriedade: 'id' });
    }, error => {
      this.toastService.showError('Opa!', 'Algo deu errado!');
    });
  }

  newEntity() {
    this.router.navigate(['equipamento', 'novo']);
  }

  delete(id: number) {
    this.equipamentoService.delete(id).subscribe(() => {
      this.toastService.showSuccess('Sucesso!', 'Registro removido com sucesso!');
      this.findAll();
    }, error => {
      this.toastService.showWarn('Atenção!', 'Não foi possível remover o registro!');
    });
  }


}
