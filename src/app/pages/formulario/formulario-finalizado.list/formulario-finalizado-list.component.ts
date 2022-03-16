import { Component, OnInit } from "@angular/core";

import { FormularioService } from "../formulario.service";
import { STATUS_FORMULARIO } from "src/app/shared/consts/status-formulario";
import { Formulario } from "../formulario";
import { LabelValue } from "src/app/shared/classes/LabelValue";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";

@Component({
    selector: "app-formulario-list",
    templateUrl: "./formulario-finalizado-list.component.html",
    styleUrls: ["./formulario-finalizado-list.component.css"],
})
export class FormularioFinalizadoListComponent implements OnInit {
    formularios: Formulario[];
    formulariosFilter: Formulario[];
    opcoesStatus: string[] = ["AMOSTRA_RECUSADA", "FINALIZADO"];
    filtro: LabelValue[] = STATUS_FORMULARIO;
    statusFormulario = STATUS_FORMULARIO;

    Editor = ClassicEditor;
    formularios2 = new Formulario();
    display: boolean;
    cols: any[];

    constructor(private formularioService: FormularioService) {
        this.filtro = STATUS_FORMULARIO.filter((f) =>
            this.opcoesStatus.includes(f.value)
        );
    }

    ngOnInit() {
        this.findAll();

        this.cols = [
          { field: "nomeServico", header: "Serviços" },
          { field: "pessoa.nome", header: "Solicitante" },
          { field: "participacaoPrograma.orientador.instituicao.nome", header: "Instituição" },
          { field: "participacaoPrograma.programaEnsino.sigla", header: "Programa de Ensino" },
          { field: "dataSolicitacao", header: "Data de Solicitação" },
          { field: "creditoProfessor.nomeProjeto", header: "Nome do Projeto" }
      ];
    }

    findAll() {
        this.formularioService.findAll().subscribe((formularios) => {
            this.formularios = formularios;
            this.formulariosFilter = formularios.filter(
                (x) => x.status === STATUS_FORMULARIO[1].value
            );
        });
    }

    visualizarClick(idRegistro: number) {
        this.formularioService.findOne(idRegistro).subscribe((formularios) => {
            this.formularios2 = formularios;
        });
    }

    filtrar(event) {
        const status = event.value;
        this.formulariosFilter = this.formularios.filter(
            (f) => f.status === status
        );
    }
}
