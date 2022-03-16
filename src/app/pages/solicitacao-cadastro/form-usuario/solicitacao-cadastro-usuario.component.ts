import { Component, OnInit } from "@angular/core";
import { MenuItem, SelectItem } from "primeng/api";
import { TipoSolicitacao } from "src/app/shared/consts/TipoSolicitacao";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LabelValue } from "src/app/shared/classes/LabelValue";
import { TipoPessoa } from "../../../shared/consts/TipoPessoa";
import { CidadeService } from "../../cidade/cidade.service";
import { pt } from "../../../shared/internalization/CalendarPt";
import { ToastService } from "src/app/shared/components/toast/toast.service";
import { toBrasilianDate } from "src/app/shared/utils/dateUtils";
import { getCountErrors } from "src/app/shared/utils/formUtils";
import { SolicitacaoCadastroService } from "../solicitacao-cadastro.service";

@Component({
    selector: "app-solicitacao-cadastro-usuario",
    templateUrl: "./solicitacao-cadastro-usuario.component.html",
    styleUrls: ["./solicitacao-cadastro-usuario.component.css"]
})
export class SolicitacaoCadastroUsuarioComponent implements OnInit {
    itemsStep: MenuItem[];
    itemsSelectInicial: SelectItem[];
    cidadesOption: LabelValue[] = [];

    activeIndex: number = 0;
    tipoSelecionado: TipoSolicitacao;
    confirmado: boolean;
    form: FormGroup;

    ptCalendar = pt;
    constructor(
        private formBuilder: FormBuilder,
        private solicitacaoCadastroService: SolicitacaoCadastroService,
        private cidadeService: CidadeService,
        private toastService: ToastService,
        private router: Router
    ) {}
    checkPasswords(group: FormGroup) {
        let pass = group.get("senha").value;
        let confirmPass = group.get("confirmacaoSenha").value;

        return pass === confirmPass ? null : { notSame: true };
    }
    ngOnInit() {
        this.confirmado = false;
        this.initLists();
    }

    initSteps() {
        this.itemsStep = [
            {
                label: "Identificação",
                command: (event: any) => {
                    this.activeIndex = 0;
                }
            },
            {
                label: "Vínculo",
                command: (event: any) => {
                    this.activeIndex = 1;
                }
            },
            {
                label: "Finalização",
                command: (event: any) => {
                    this.activeIndex = 2;
                }
            }
        ];
    }

    initLists() {
        this.itemsSelectInicial = [
            {
                value: TipoSolicitacao.Aluno,
                label: "Aluno",
                icon: "pi pi-users",
                title:
                    "Confirme essa opção se for aluno da graduação, especialização, mestrado ou doutorado"
            },
            {
                value: TipoSolicitacao.Professor,
                label: "Professor",
                icon: "pi pi-user",
                title:
                    "Confirme essa opção se for professor orientador de projetos de pesquisa, TCC ou dissertações"
            },
            {
                value: TipoSolicitacao.PessoaJuridica,
                label: "Empresa privada",
                icon: "pi pi-briefcase",
                title:
                    "Confirme essa opção se for empresa da iniciativa privada"
            }
        ];
        this.initSteps();
    }

    avancar() {
        this.confirmado = true;

        const isEmpresa =
            this.tipoSelecionado === TipoSolicitacao.PessoaJuridica;

        const validationNotEmpresa = isEmpresa
            ? undefined
            : Validators.required;

        this.form = this.formBuilder.group(
            {
                senha: ["", Validators.required],
                confirmacaoSenha: ["", Validators.required],
                tipoPessoa: [
                    isEmpresa ? TipoPessoa.Juridica : TipoPessoa.Fisica,
                    Validators.required
                ],
                cidade: ["", Validators.required],
                nome: ["", Validators.required],
                documento: ["", Validators.required],
                cpfOrientador: [""],
                cep: ["", Validators.required],
                endereco: ["", Validators.required],
                bairro: ["", Validators.required],
                numero: [null, Validators.required],
                complemento: [""],
                telefone: ["", Validators.required],
                celular: ["", Validators.required],
                email: ["", Validators.compose([Validators.required, Validators.email])],
                nomeInstituicao: ["", validationNotEmpresa],
                inscricaoEstadual: [""],
                ehProfessor: [
                    this.tipoSelecionado === TipoSolicitacao.Professor
                ],
                nomeProgramaEnsino: ["", validationNotEmpresa],
                dataTerminoProgramaEnsino: [new Date(), validationNotEmpresa],
                nomeprojeto: [""],
            },
            { validators: [this.checkPasswords] }
        );

        if (this.tipoSelecionado === TipoSolicitacao.PessoaJuridica) {
            this.itemsStep = this.itemsStep.filter((x, index) => index !== 1);
        }
        this.buscaCidades();
    }

    buscaCidades() {
        this.cidadeService.findAll().subscribe(
            cidades => {
                this.cidadesOption =
                    cidades.map(cidade => ({
                        label: `${cidade.nome}, ${cidade.uf}`,
                        value: cidade
                    })) || [];

                if (this.form.value.cidade === "") {
                    this.form["cidade"] = this.cidadesOption[0].value;
                }
            },
            error => {}
        );
    }

    proximoPasso() {
        if (this.activeIndex === 2) {
            return;
        }
        this.activeIndex = this.activeIndex + 1;
    }
    voltarPasso() {
        if (this.activeIndex === 0) {
            this.confirmado = false;
            this.tipoSelecionado = undefined;
            this.initSteps();

            return;
        }

        this.activeIndex = this.activeIndex - 1;
    }

    salvar() {
        if (this.form.valid) {
            const solicitacao = this.form.getRawValue();
            solicitacao.dataTerminoProgramaEnsino = toBrasilianDate(
                solicitacao.dataTerminoProgramaEnsino
            );

            this.solicitacaoCadastroService
                .saveSolicitacaoCadastro(solicitacao)
                .subscribe(
                    r => {
                        if (r.sucesso) {
                            this.toastService.showSuccess(
                                "Tudo certo!",
                                "Espere até seu cadastro ser aceito, você será notificado via email!"
                            );
                            this.form.reset();
                            this.activeIndex = 0;
                            this.confirmado = false;
                            this.tipoSelecionado = undefined;
                            this.initSteps();
                        } else {
                            this.toastService.showError(
                                "Algo não deu certo!",
                                r.mensagens[0]
                            );
                        }
                    },
                    () => {
                        this.toastService.showError(
                            "Algo não deu certo!",
                            "Não foi possível completar a ação!"
                        );
                    }
                );
        }
    }
    algumErro() {
        return getCountErrors(this.form) > 0;
    }

    voltarLogin() {
        this.router.navigate(["login"]);
    }
}
