import { Component, OnInit } from "@angular/core";
import { Pessoa } from "../pessoa";
import { Router } from "@angular/router";
import { PessoaService } from "../pessoa.service";
import { ToastService } from "src/app/shared/components/toast/toast.service";

@Component({
    selector: "app-pessoa-list",
    templateUrl: "./pessoa-list.component.html",
    styleUrls: ["./pessoa-list.component.css"]
})
export class PessoaListComponent implements OnInit {
    pessoas: Pessoa[];

    cols: any[];

    constructor(
        private pessoaService: PessoaService,
        protected router: Router,
        private toastService: ToastService
    ) {}

    ngOnInit() {
        this.findAll();

        this.cols = [
            { field: "nome", header: "Nome" },
            { field: "documento", header: "Documento" },
            { field: "telefone", header: "Telefone" },
            { field: "celular", header: "Celular" }
        ];
    }

    findAll() {
        this.pessoaService.findAll().subscribe(pessoas => {
            this.pessoas = pessoas;
        });
    }

    newEntity() {
        this.router.navigate(["pessoa", "novo"]);
    }

    delete(id: number) {
        this.pessoaService.delete(id).subscribe(
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
}
