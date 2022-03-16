import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { FormularioService } from '../../../pages/formulario/formulario.service';

@Component({
  selector: 'app-app-report',
  templateUrl: './app-report.component.html',
  styleUrls: ['./app-report.component.css']
})
export class AppReportComponent implements OnInit {

  formulario: any = {};

    constructor(
    private route: ActivatedRoute,
    private formularioService: FormularioService
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.params.id);
    if (id) {
      this.formularioService.findOne(id).subscribe(formulario => {
      this.formulario = formulario;
        document.getElementById('metodologia').innerHTML = formulario.metodologia || '';
        //document.getElementById('laudo').innerHTML = formulario.laudo || '';
        document.getElementById('observacao').innerHTML = formulario.equipamento.observacoesFixas || '';
      });
    }
  }

}
