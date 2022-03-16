import { HistoricoCreditoService } from './historicoCredito.service';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LabelValue } from "src/app/shared/classes/LabelValue";
import { FormGroup } from "@angular/forms";
import { PessoaService } from '../pessoa/pessoa.service';
import { HistoricoCredito } from './historicoCredito';
@Component({
    selector: "app-historicoCredito-list",
    templateUrl: "./historicoCredito.component.html",
    styleUrls: ["./historicoCredito.component.css"]
})
export class HistoricoCreditoComponent implements OnInit {
    historicoCredito: HistoricoCredito[];
    professoresOption: LabelValue[] = [];
    cols: any[];
    display: boolean;
    form: FormGroup;
    idRegistro: number;
    historicoCreditoes = new HistoricoCredito();

    constructor(
        private historicoCreditoService: HistoricoCreditoService,
        protected router: Router,
        private pessoaService: PessoaService,
    ) {
     
    }
    ngOnInit() {
        this.findAll();

        if (this.idRegistro) {
            this.historicoCreditoService
                .findOne(this.idRegistro)
                .subscribe(e => {
                    this.form.patchValue(e);
                });
        } else {
            this.historicoCreditoes = new HistoricoCredito();
        }

        this.cols = [
            { field: "pessoa.nome", header: "Professor" },
            { field: "nomeProjeto", header: "Nome do Projeto" },
            { field: "dataProjeto", header: "Data do Projeto" },
            { field: "valorPago", header: "Valor Pago" },
        ];


        this.buscaProfessores();
    }
    
    findAll() {
        this.historicoCreditoService.buscarCreditoPorProfessor().subscribe((dados) => {
            this.historicoCredito = dados;
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
}
