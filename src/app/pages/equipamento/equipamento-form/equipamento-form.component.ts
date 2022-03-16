import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { LabelValue } from "src/app/shared/classes/LabelValue";
import { UnidadeMedidaCobrancaEquipamento } from "src/app/shared/consts/UnidadeMedidaCobrancaEquipamento";
import { ToastService } from "src/app/shared/components/toast/toast.service";

import { Equipamento } from "../Equipamento";
import { EquipamentoService } from "../equipamento.service";
import { Serviico } from "../serviico";
import { ServicoService } from "../servico.service";

@Component({
    selector: "app-equipamento-form",
    templateUrl: "./equipamento-form.component.html",
    styleUrls: ["./equipamento-form.component.css"]
})
export class EquipamentoFormComponent implements OnInit {
    unidadesMedida: LabelValue[] = UnidadeMedidaCobrancaEquipamento;
    Editor = ClassicEditor;

    form: FormGroup;
    formModal: FormGroup;
    servicos: Serviico[];
    servicoEdit = new Serviico();
    showDialog = false;
    equipIdEdit: number;

    constructor(
        private formBuilder: FormBuilder,
        private equipamentoService: EquipamentoService,
        private servicoService: ServicoService,
        private router: Router,
        private route: ActivatedRoute,
        private toastService: ToastService
    ) {
        (this.form = this.formBuilder.group({
            id: [""],
            nome: ["", [Validators.required]],
            sigla: ["", [Validators.required, Validators.maxLength(10)]],
            metodologia: ["", [Validators.required]],
            laudoPadrao: [""],
            observacoesFixas: [""],
            unidadeMedidaInterno: [this.unidadesMedida[0], ""],
            valorInterno: [null],
            unidadeMedidaExterno: [this.unidadesMedida[0], ""],
            valorExterno: [null],
            unidadeMedidaPadrao: [this.unidadesMedida[0], ""],
            valorPadrao: [null]
        })),
            (this.formModal = this.formBuilder.group({
                id: [""],
                descricao: ["", [Validators.required]],
                equipamento: ["", [Validators.required]]
            }));
    }

    ngOnInit() {
        const id = Number(this.route.snapshot.params.id);
        if (id) {
            this.equipamentoService.findOne(id).subscribe(equipamento => {
                if (equipamento) {
                    this.equipIdEdit = equipamento.id;
                    this.findServicos();
                }
                this.form.patchValue(equipamento);
            });
        } else {
            this.form
                .get("unidadeMedidaInterno")
                .setValue(this.unidadesMedida[0].value);
            this.form
                .get("unidadeMedidaExterno")
                .setValue(this.unidadesMedida[0].value);
            this.form
                .get("unidadeMedidaPadrao")
                .setValue(this.unidadesMedida[0].value);
        }
    }

    cancel() {
        this.router.navigate(["equipamento"]);
    }

    save() {
        const equipamento = this.form.getRawValue();
        this.saveService(equipamento);
    }

    saveService(equipamento: Equipamento) {
        this.equipamentoService.save(equipamento).subscribe(
            ret => {
                this.toastService.showSuccess(
                    "Sucesso",
                    "Registro salvo com sucesso!"
                );
                this.router.navigate(["equipamento"]);
            },
            error => {
                this.toastService.showError("Opa!", error);
            }
        );
    }

    deleteServico(id: number) {
        this.servicoService.delete(id).subscribe(
            () => {
                this.toastService.showSuccess(
                    "Sucesso!",
                    "Serviço removido com sucesso!"
                );
                let indice = this.servicos.findIndex(i => i.id === id);
                this.servicos.splice(indice, 1);
            },
            error => {
                this.toastService.showWarn(
                    "Atenção!",
                    "Não foi possível remover o serviço!"
                );
            }
        );
    }

    findServicos() {
        this.servicoService
            .findByEquipamento(this.equipIdEdit)
            .subscribe(e => (this.servicos = e));
    }

    newEntity() {
        this.servicoEdit = new Serviico();
        this.formModal.reset();
        this.showDialog = true;
    }

    editServico(servico: Serviico) {
        this.servicoEdit = servico;
        this.formModal.patchValue(this.servicoEdit);
        this.showDialog = true;
    }

    saveServico() {
        const servico = this.formModal.getRawValue();
        servico.equipamento = {
            id: this.equipIdEdit
        };
        this.servicoService.save(servico).subscribe(
            servico => {
                this.adicionarServico(servico, this.servicos.concat([]));
                this.servicoEdit = new Serviico();
                // this.findServicos();
                this.showDialog = false;
                this.toastService.showSuccess(
                    "Sucesso",
                    "Serviço salvo com sucesso!"
                );
            },
            error => {
                this.toastService.showWarn(
                    "Atenção!",
                    "Não foi possível salvar o serviço!"
                );
            }
        );
    }

    adicionarServico(servico: Serviico, servicos: Serviico[]) {
        let serv = servicos.findIndex(s => s.id == servico.id);
        if (serv != -1) {
            this.servicos[serv] = servico;
        } else {
            this.servicos.push(servico);
        }
    }
}
