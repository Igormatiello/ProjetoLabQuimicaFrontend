import { Component, OnInit, ɵConsole } from "@angular/core";

import { STATUS_FORMULARIO } from "../../../shared/consts/status-formulario";

import { Formulario } from "../formulario";
import { FormularioService } from "../formulario.service";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ChangeEvent } from "@ckeditor/ckeditor5-angular";
import { LoginService } from '../../login/login.service';

@Component({
    selector: "app-formulario-list-usuario.",
    templateUrl: "./formulario-list-usuario.component.html",
    styleUrls: ["./formulario-list-usuario.component.css"],
})
export class FormularioListUsuarioComponent implements OnInit {
    statusFormulario = STATUS_FORMULARIO;

    formularios: Formulario[];

    // formularios2: Formulario[] = [];

    formularios2 = new Formulario();

    Editor = ClassicEditor;

    display: boolean;

    cols: any[];

    ehPessoaJuridica: boolean;

    constructor(private formularioService: FormularioService,
        private loginService: LoginService) {}

    ngOnInit() {

        this.ehPessoaJuridica = false;

        this.buscaDadosPessoa();

        this.cols = [
            { field: "pessoa.nome", header: "Requerente" },
            { field: "nomeServico", header: "Serviços" },
            { field: "nomeProgramaEnsino", header: "Programa de ensino" },
            { field: "equipamento.nome", header: "Equipamento" },
            { field: "status", header: "Status" },
            { field: "dataSolicitacao", header: "Data de solicitação" },
            { field: "creditoProfessor.nomeProjeto", header: "Nome do Projeto" }
        ];

    }

    buscaDadosPessoa() {

        this.loginService.getLoggedUserData().subscribe((r) => {
            if (r.tipoPessoa === "Juridica") {
                this.ehPessoaJuridica = true;
            }
            this.findAll();
        });

    }

    findAll(){
        if(this.ehPessoaJuridica){
            this.formularioService.buscaFormulariosPessoaJuridica().subscribe((formularios) => {
                this.formularios = formularios;
            });
        } else{
            this.formularioService.buscaPorPessoa().subscribe((formularios) => {
                this.formularios = formularios;
            });
        }
    }

    visualizarClick(idRegistro: number) {
        this.formularioService.findOne(idRegistro).subscribe((formularios) => {
            this.formularios2 = formularios;
        });

        this.loginService.getLoggedUserData().subscribe((r) => {
            if (r.tipoPessoa === "Juridica") {
                this.ehPessoaJuridica = true;
            }
        });
    }

    getClassByStatus(status: string) {
        console.log(status);
        return status.toLowerCase();
    }
}
