import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { debounceTime, delay } from "rxjs/operators";
import { LabelValue } from "src/app/shared/classes/LabelValue";
import { TipoInstituicao } from "src/app/shared/consts/TipoInstituicao";
import { CidadeService } from "../../cidade/cidade.service";
import { Instituicao } from "../instituicao";
import { InstituicaoService } from "../instituicao.service";
import { Cidade } from "../../cidade/cidade";

@Component({
    selector: "app-instituicao-form",
    templateUrl: "./instituicao-form.component.html",
    styleUrls: ["./instituicao-form.component.css"]
})
export class InstituicaoFormComponent implements OnInit {
    cidadesOption: LabelValue[] = [];
    CidadesSelected: any[] = [];
    opcoesTipo: LabelValue[] = TipoInstituicao;
    form: FormGroup;
    instituicao: Instituicao;

    constructor(
        private instituicaoService: InstituicaoService,
        private cidadeService: CidadeService,
        protected router: Router,
        private route: ActivatedRoute
    ) {
        const fb = new FormBuilder();

        this.form = fb.group({
            id: [""],
            nome: ["", Validators.required],
            cidade: ["", Validators.required],
            tipoInstituicao: [this.opcoesTipo[0].value, Validators.required]
        });
    }

    ngOnInit() {
        const id = Number(this.route.snapshot.params.id);
        if (id) {
            this.instituicaoService
                .findOne(id)
                .subscribe(i => this.form.patchValue(i));
        }
        this.buscaCidadesService();
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
            }
        );
    }

    cancel() {
        this.router.navigate(["instituicao"]);
    }

    save() {
        const instituicao = this.form.getRawValue();
        this.saveInstituicaoService(instituicao);
    }

    saveInstituicaoService(instituicao: Instituicao) {
        this.instituicaoService.save(instituicao).subscribe(
            () => {
                this.router.navigate(["instituicao"]);
            },
            error => {
            }
        );
    }

    keyUpAutoComplete(K) {
        const nome = this.form.get("cidade").value;
        this.buscaCidadesByNameService(nome);
    }

    buscaCidadesByNameService(nome) {
        if (!!nome) {
            if (nome.length > 3) {
                this.cidadeService
                    .findCidadeByNomeLike(nome)
                    .pipe(debounceTime(500), delay(500))
                    .subscribe(
                        cidades => {
                        },
                        error => {
                        }
                    );
            }
        }
    }
}
