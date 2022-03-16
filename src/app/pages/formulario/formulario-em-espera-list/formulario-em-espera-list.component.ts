import { Component, OnInit } from "@angular/core";

import { FormularioService } from "../formulario.service";
import { Formulario } from "../formulario";
import { MudaStatus } from "../mudaStatus";
import { STATUS_FORMULARIO } from "src/app/shared/consts/status-formulario";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AppReportComponent } from "../../../shared/components/app-report/app-report.component";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { LoginService } from "../../login/login.service";

@Component({
    selector: "app-formulario-list",
    templateUrl: "./formulario-em-espera-list.component.html",
})
export class FormularioEmEsperaListComponent implements OnInit {
    formularios: Formulario[];
    formularios2 = new Formulario();
    mudaStatus: MudaStatus;
    form: FormGroup;
    statusFormulario = STATUS_FORMULARIO;

    Editor = ClassicEditor;

    cols: any[];

    constructor(
        private formularioService: FormularioService,
        private loginService: LoginService
    ) {
        const fb = new FormBuilder();
        this.form = fb.group({
            id: ["", Validators.required],
            motivoRecusa: ["", Validators.required],
        });
    }
    display1: boolean = false;
    display2: boolean = false;
    ngOnInit() {
        this.findAll();
        this.mudaStatus = {
            motivoRejeicao: "",
            status: "",
        };

        this.cols = [
            { field: "pessoa.nome", header: "Requerente" },
            { field: "nomeServico", header: "Serviços" },
            { field: "nomeProgramaEnsino", header: "Programa de ensino" },
            { field: "equipamento.nome", header: "Equipamento" },
            { field: "status", header: "Status" },
            { field: "dataSolicitacao", header: "Data de solicitação" },
            {
                field: "creditoProfessor.nomeProjeto",
                header: "Nome do Projeto",
            }
        ];
    }

    findAll() {
        this.formularioService.findAll().subscribe((formularios) => {
            this.formularios = formularios.filter(
                (x) => x.status === STATUS_FORMULARIO[0].value
            );
        });
    }

    visualizarClick(idRegistro: number) {
        this.formularioService.findOne(idRegistro).subscribe((formularios) => {
            this.formularios2 = formularios;
        });

    }

    confirmaStatus(id: number) {
        this.mudaStatus.status = STATUS_FORMULARIO[2].value;
        this.formularioService.mudaStatus(id, this.mudaStatus).subscribe(() => {
            this.findAll();
        });
    }
    recusaStatus() {
        const formulario = this.form.getRawValue();
        this.mudaStatus.status = STATUS_FORMULARIO[1].value;
        this.mudaStatus.motivoRejeicao = formulario.motivoRecusa;
        this.formularioService
            .mudaStatus(formulario.id, this.mudaStatus)
            .subscribe(() => {
                this.findAll();
            });
        this.fechar();
    }

    showDialog(id: number) {
        this.display1 = true;
        this.form.setValue({
            ...this.form.getRawValue(),
            id,
        });
    }

    fechar() {
        this.display1 = false;
    }
}
