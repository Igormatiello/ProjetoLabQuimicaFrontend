import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PessoaService } from "../pessoa.service";
import { Pessoa } from "../pessoa";
import { LabelValue } from "../../../shared/classes/LabelValue";
import { CidadeService } from "../../cidade/cidade.service";
import { SelectItem } from "primeng/api";
import { ToastService } from "src/app/shared/components/toast/toast.service";

@Component({
    selector: "app-pessoa-form",
    templateUrl: "./pessoa-form.component.html",
    styleUrls: ["./pessoa-form.component.css"]
})
export class PessoaFormComponent implements OnInit {
    ehJuridica: boolean;
    cidadesOption: LabelValue[] = [];
    form: FormGroup;
    pessoa: Pessoa;
    tipoPessoaOption: SelectItem[];
    ativoOption: SelectItem[];

    constructor(
        private pessoasService: PessoaService,
        protected router: Router,
        private route: ActivatedRoute,
        private toastService: ToastService,
        private cidadeService: CidadeService
    ) {
        this.form = new FormBuilder().group({
            id: [""],
            nome: ["", Validators.required],
            documento: ["", Validators.required],
            cidade: ["", Validators.required],
            bairro: ["", Validators.required],
            cep: ["", Validators.required],
            ehAtivo: ["", Validators.required],
            email: ["", Validators.required],
            endereco: ["", Validators.required],
            numero: ["", Validators.required],
            telefone: ["", Validators.required],
            tipoPessoa: ["", Validators.required],
            complemento: [""],
            inscricaoEstadual: [""],
            celular: ["", Validators.required]
        });

        this.tipoPessoaOption = [
            { label: "Física", value: "Fisica" },
            { label: "Jurídica", value: "Juridica" }
        ];
        this.ativoOption = [
            { label: "Ativo", value: true },
            { label: "Inativo", value: false }
        ];
    }

    ngOnInit() {
        const id = Number(this.route.snapshot.params.id);
        if (id) {
            this.pessoasService.findOne(id).subscribe(e => {
                this.form.patchValue(e);
                this.setTipoPessoa({
                    value: e.tipoPessoa
                });
            });
        } else {
            this.pessoa = new Pessoa();
        }
        this.buscaCidadesService();
    }

    cancel() {
        this.router.navigate(["pessoa"]);
    }

    save() {
        if (this.form.valid) {
            const pessoa = this.form.getRawValue();
            this.savePessoaService(pessoa);
        }
    }

    savePessoaService(pessoa: Pessoa) {
        this.pessoasService.save(pessoa).subscribe(
            () => {
                this.toastService.showSuccess(
                    "Sucesso",
                    "Registro salvo com sucesso!"
                );
                this.router.navigate(["pessoa"]);
            },
            error => {
                this.toastService.showError(
                    "Atenção",
                    "Não foi possível concluir a ação"
                );
            }
        );
    }

    buscaCidadesService() {
        this.cidadeService.findAll().subscribe(
            cidades => {
                this.cidadesOption =
                    cidades.map(cidade => ({
                        label: `${cidade.nome}, ${cidade.uf}`,
                        value: cidade
                    })) || [];

                if (this.form.value.cidade === "") {
                    this.form.setValue({
                        ...this.form.value,
                        cidade: this.cidadesOption[0].value
                    });
                }
            },
            error => {
                this.toastService.showError(
                    "Atenção",
                    "Não foi possível buscar as cidades"
                );
            }
        );
    }

    setTipoPessoa({ value }) {
        this.ehJuridica = value === "Juridica";
    }
}
