import { Component, OnInit } from '@angular/core';

import { FormularioService } from '../formulario.service';
import { Formulario } from '../formulario';
import { MudaStatus } from '../mudaStatus';
import { STATUS_FORMULARIO } from 'src/app/shared/consts/status-formulario';

@Component({
  selector: 'app-formulario-list',
  templateUrl: './formulario-em-analise-list.component.html'
})
export class FormularioEmAnaliseListComponent implements OnInit {

  formularios: Formulario[];
  mudaStatus: MudaStatus;

  cols: any[];

  constructor(
    private formularioService: FormularioService
  ) { }


  display = false;

  ngOnInit() {
    this.findAll();
    this.mudaStatus = {
      motivoRejeicao: '',
      status: ''
    };

    this.cols = [
      { field: "pessoa.nome", header: "Requerente" },
      { field: "nomeServico", header: "Serviços" },
      { field: "nomeProgramaEnsino", header: "Programa de ensino" },
      { field: "equipamento.nome", header: "Equipamento" },
      { field: "status", header: "Status" },
      { field: "dataSolicitacao", header: "Data de solicitação" }
  ];
  }

  findAll() {
    this.formularioService.findAll().subscribe(formularios => {
      this.formularios = formularios.filter((x) => x.status === STATUS_FORMULARIO[2].value);
    });
  }

  finalizaFormulario(id: number) {
    this.mudaStatus.status = STATUS_FORMULARIO[4].value;
    this.formularioService.mudaStatus(id, this.mudaStatus).subscribe(() => {
      this.findAll();
    });
    
  }
}
