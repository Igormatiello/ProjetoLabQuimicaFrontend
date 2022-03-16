import { Component, OnInit } from '@angular/core';
import { LabelValue } from 'src/app/shared/classes/LabelValue';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pessoa } from '../pessoa/pessoa';
import { SelectItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { CidadeService } from '../cidade/cidade.service';
import { PessoaService } from '../pessoa/pessoa.service';
import { PerfilService } from './perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  ehJuridica: boolean;
    cidadesOption: LabelValue[] = [];
    form: FormGroup;
    pessoa: Pessoa;
    tipoPessoaOption: SelectItem[];
    ativoOption: SelectItem[];

    constructor(
        private perfilService: PerfilService,
        private pessoaService: PessoaService,
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
            email: ["", Validators.required],
            endereco: ["", Validators.required],
            numero: ["", Validators.required],
            telefone: ["", Validators.required],
            tipoPessoa: ["", Validators.required],
            complemento: [""],
            inscricaoEstadual: [""],
            celular: [""]
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
        this.perfilService.findOne().subscribe(e => {
            this.form.patchValue(e.usuario.pessoa);
            this.setTipoPessoa({
                value: e.usuario.pessoa.tipoPessoa
            });
        });

        this.buscaCidadesService();
    }

    cancel() {
        this.router.navigate([""]);
    }

    save() {
        if (this.form.valid) {
            const pessoa = this.form.getRawValue();
            this.savePessoaService(pessoa);
        }
    }

    savePessoaService(pessoa: Pessoa) {
        this.pessoaService.save(pessoa).subscribe(
            () => {
                this.toastService.showSuccess(
                    "Sucesso",
                    "Registro salvo com sucesso!"
                );
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
        if (value === "Juridica") {
            this.ehJuridica = true;
        } else {
            this.ehJuridica = false;
        }
    }
}
