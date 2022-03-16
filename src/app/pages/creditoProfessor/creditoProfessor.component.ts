import { HistoricoCredito } from './../historicoCredito/HistoricoCredito';
import { HistoricoCreditoService } from './../historicoCredito/historicoCredito.service';
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastService } from "src/app/shared/components/toast/toast.service";
import { LabelValue } from "src/app/shared/classes/LabelValue";
import { CreditoProfessorService } from "./creditoProfessor.service";
import { CreditoProfessor } from "./creditoProfessor";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PessoaService } from '../pessoa/pessoa.service';
@Component({
    selector: "app-creditoProfessor-list",
    templateUrl: "./creditoProfessor.component.html",
    styleUrls: ["./creditoProfessor.component.css"]
})
export class CreditoProfessorComponent implements OnInit {
    creditoProfessor: CreditoProfessor[];
    professoresOption: LabelValue[] = [];
    cols: any[];
    display: boolean;
    form: FormGroup;
    idRegistro: number;
    creditoProfessores = new CreditoProfessor();

    constructor(
        private creditoProfessorService: CreditoProfessorService,
        protected router: Router,
        private route: ActivatedRoute,
        private pessoaService: PessoaService,
        private toastService: ToastService
    ) {
        this.form = new FormBuilder().group({
            id: [""],
            nomeProjeto: ["", Validators.required],
            pessoa: ["", Validators.required],
            valorCredito: ["", Validators.required]
        });
     
    }
    ngOnInit() {
        this.findAll();

        if (this.idRegistro) {
            this.creditoProfessorService
                .findOne(this.idRegistro)
                .subscribe(e => {
                    this.form.patchValue(e);
                });
        } else {
            this.creditoProfessores = new CreditoProfessor();
        }

        this.cols = [
            { field: "pessoa.nome", header: "Professor" },
            { field: "nomeProjeto", header: "Nome do Projeto" },
            { field: "valorCredito", header: "Valor do Crédito" },
            { field: "valorSaldo", header: "Saldo" },
            { field: "dataInclusao", header: "Data de inclusão" },
            { field: "dataAtualizacao", header: "Data de Aatualização" }
        ];


        this.buscaProfessores();
    }
    
    findAll() {
        this.creditoProfessorService.findAll().subscribe((creditos) => {
            this.creditoProfessor = creditos;
        });
    }

    buscaProfessores() {
        this.pessoaService.buscaProfessores().subscribe(pessoas => {
            this.professoresOption = pessoas.map(pessoa =>
                ({
                    label: `${pessoa.nome}`,
                    value: pessoa
                })) || [];
        }, error => {
            console.log(error);
        });
    }

    save() {
        const creditoProfessor = this.form.getRawValue();
        this.saveCreditoProfessorService(creditoProfessor);
    }

    saveCreditoProfessorService(creditoProfessor: CreditoProfessor) {
        this.creditoProfessorService
            .saveCredito(creditoProfessor)
            .subscribe(
                () => {
                    this.toastService.showSuccess(
                        "Sucesso",
                        "Registro salvo com sucesso!"
                    );
                    this.findAll();
                },
                error => {}
            );
    }

    newEntity() {
        this.router.navigate([
            "creditoProfessor",
            "novo"
        ]);
    }

    delete(id: number) {
        this.creditoProfessorService.delete(id).subscribe(
            () => {
                this.toastService.showSuccess(
                    "Sucesso",
                    "Registro deletado com sucesso!"
                );
                this.findAll();
            },
            () => {
                this.toastService.showError(
                    "Atenção",
                    "Não foi possível concluir a ação."
                );
            }
        );
    }

    editClick(idRegistro: number) {
        this.idRegistro = idRegistro;
        if (this.idRegistro > 0) {
            this.creditoProfessorService
                .findOne(this.idRegistro)
                .subscribe(e => {
                    this.form.patchValue(e);
                });
        } else {
            this.form.reset();
        }
    }
   
}
