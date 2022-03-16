import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LabelValue } from "src/app/shared/classes/LabelValue";
import { pt } from "../../../shared/internalization/CalendarPt";
import { ToastService } from "src/app/shared/components/toast/toast.service";
import { toBrasilianDate } from "src/app/shared/utils/dateUtils";
import { getCountErrors } from "src/app/shared/utils/formUtils";
import { FormularioService } from "../formulario.service";
import { EquipamentoService } from "../../equipamento/equipamento.service";
import { ServicoService } from "../servico.service";
import { LoginService } from "../../login/login.service";
import { ParticipacaoProgramaEnsinoService } from "../../participacao-programa-ensino/participacao-programa-ensino-service";
import { NaturezasProjeto } from "../../../shared/consts/NaturezasProjeto";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { PessoaService } from "../../pessoa/pessoa.service";
import { Pessoa } from "../../pessoa/pessoa";
import { CreditoProfessorService } from "../../creditoProfessor/creditoProfessor.service";
import { Observable } from "rxjs";

@Component({
    selector: "app-formulario-form-usuario",
    templateUrl: "./formulario-form-usuario.component.html",
    styleUrls: ["./formulario-form-usuario.component.css"],
})
export class FormularioFormUsuarioComponent implements OnInit {
    equipamentosOption: any[];
    servicosOption: LabelValue[] = [];
    cidadesOption: LabelValue[] = [];
    instituicoesOption: LabelValue[] = [];
    programasEnsinoOption: any[] = [];
    naturezasProjetoOption: LabelValue[] = NaturezasProjeto;
    professoresOption: LabelValue[] = [];
    creditosProfessoresOption: LabelValue[] = [];
    Editor = ClassicEditor;

    activeIndex: number = 0;
    equipamentoId: number;
    confirmado: boolean;
    form: FormGroup;

    professorId: number;
    ehPessoaJuridica: boolean;

    ptCalendar = pt;
    constructor(
        private formBuilder: FormBuilder,
        private equipamentoService: EquipamentoService,
        private formularioService: FormularioService,
        private participacaoProgramaEnsinoService: ParticipacaoProgramaEnsinoService,
        private servicoService: ServicoService,
        private loginService: LoginService,
        private toastService: ToastService,
        private pessoaService: PessoaService,
        private creditoProfessorService: CreditoProfessorService,
        private router: Router
    ) {}
    ngOnInit() {
        this.confirmado = false;
        this.ehPessoaJuridica = false;
        this.professorId = 0;
        this.initLists();
    }
    initLists() {
        this.equipamentoService.findAll().subscribe((lst) => {
            this.equipamentosOption = lst.map((equip) => ({
                ...equip,
                value: equip.id,
                label: equip.nome,
            }));
        });
    }

    initServicos() {
        this.servicoService
            .findServicosEquipamento(this.equipamentoId)
            .subscribe((r) => {
                this.servicosOption =
                    r.map((serv) => ({
                        label: `${serv.descricao}`,
                        value: serv,
                    })) || [];

                if (this.form.value.principioAtivo === "") {
                    this.form.setValue({
                        ...this.form.value,
                        servico: this.servicosOption[0].value,
                    });
                }
            });
    }

    initPessoasInstituicoes() {
        this.loginService.getLoggedUserData().subscribe((r) => {
            this.instituicoesOption =
                r.pessoaInstituicoes.map((inst) => ({
                    label: `${inst.instituicao.nome}`,
                    value: inst.id,
                })) || [];

            if (r.pessoaInstituicoes && r.pessoaInstituicoes.length > 0) {
                this.form.patchValue({
                    pessoaInstituicao: r.pessoaInstituicoes[0],
                    pessoa: {
                        id: r.pessoaId,
                    },
                });
                this.changeInstituicao(r.pessoaInstituicoes[0]);
            } else{
                this.form.patchValue({
                    pessoaInstituicao: null,
                    participacaoPrograma: null,
                    pessoa: {
                        id: r.pessoaId,
                    },
                });
            }
            if (r.tipoPessoa === "Juridica") {
                this.ehPessoaJuridica = true;
            }
        });
    }

    changeInstituicao(pessoaInstituicao: any) {
        this.participacaoProgramaEnsinoService
            .findProgramasEnsinoPessoaInstituicaoId(pessoaInstituicao.id)
            .subscribe((r) => {
                this.programasEnsinoOption = r.map((prg) => ({
                    ...prg,
                    label: `${prg.programaEnsino.nome} - ${
                        prg.programaEnsino.sigla
                    } - ${prg.dataTermino} - ${
                        pessoaInstituicao.ehProfessor
                            ? (prg.participante &&
                                  prg.participante.pessoa.nome) ||
                              "Sem aluno relacionado"
                            : (prg.participante &&
                                  prg.orientador.pessoa.nome) ||
                              "Sem orientador relacionado"
                    }`,
                    value: prg.id,
                }));

                if (r && r.length > 0) {
                    this.form.patchValue({
                        participacaoPrograma: r[0],
                    });
                }
            });

        if (!pessoaInstituicao.ehProfessor) {
            this.pessoaService
                .buscaProfessoresFormulario(pessoaInstituicao.id)
                .subscribe(
                    (pessoas) => {
                        this.professoresOption =
                            pessoas.map((pessoa) => ({
                                label: `${pessoa.nome}`,
                                value: pessoa,
                            })) || [];
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        } else {
            this.pessoaService.buscaPessoaIdProfessorLogado().subscribe(
                (pessoas) => {
                    this.professoresOption =
                        pessoas.map((pessoa) => ({
                            label: `${pessoa.nome}`,
                            value: pessoa,
                        })) || [];
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }

    avancar() {
        this.confirmado = true;
        const equip = this.equipamentosOption.filter(
            (x) => x.id === this.equipamentoId
        )[0];

        this.initServicos();
        this.initPessoasInstituicoes();

        this.form = this.formBuilder.group({
            equipamento: [{ id: equip.id }, Validators.required],
            laudo: [equip.laudoPadrao || ""],
            metodologia: [equip.metodologia || "", Validators.required],
            nomeProgramaEnsino: [""],
            nomeServico: [""],
            pessoa: [""],
            professor: [""],
            numeroAmostras: [1, Validators.required],
            servico: ["", Validators.required],
            pessoaInstituicao: [""],
            participacaoPrograma: [""],
            creditoProfessor: [""],
            naturezaProjeto: [NaturezasProjeto[0].value, Validators.required],
            status: ["AGUARDANDO_AMOSTRA"],
        });
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
            this.equipamentoId = null;
            return;
        }

        this.activeIndex = this.activeIndex - 1;
    }

    atualizaDropCreditos() {
        this.professorId = this.professoresOption[0].value.id;

        this.creditoProfessorService
            .buscaProfessoresFormulario(this.professorId)
            .subscribe(
                (creditos) => {
                    this.creditosProfessoresOption =
                        creditos.map((credito) => ({
                            label: `${credito.nomeProjeto}`,
                            value: credito,
                        })) || [];
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    salvar() {
        if (this.form.valid) {
            const formulario = this.form.getRawValue();

            var select = document.querySelector("p-multiSelect");
            formulario.nomeServico = select.textContent;

            if (formulario.professor === "") {
                formulario.professor = null;
            }

            if (formulario.creditoProfessor === "") {
                formulario.creditoProfessor = null;
            }

            if(!this.ehPessoaJuridica){
                formulario.nomeProgramaEnsino = this.programasEnsinoOption.filter(
                    (x) => x.id == formulario.participacaoPrograma.id
                )[0].programaEnsino.nome;
    
            }

            formulario.pessoa = formulario.pessoa;

            this.formularioService.save(formulario).subscribe(
                (r) => {
                    if (r.id && r.id > 0) {
                        this.toastService.showSuccess(
                            "Tudo certo!",
                            "Formulário lançado com sucesso, acompanhe seu status pela listagem"
                        );
                        this.form.reset();
                        this.activeIndex = 0;
                        this.confirmado = false;
                        this.equipamentoId = undefined;
                        this.initLists();
                    } else {
                        this.toastService.showError(
                            "Algo não deu certo!",
                            (r.mensagens && r.mensagens[0]) ||
                                "Não foi possível salvar"
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

    selecionarEquipamento() {}
}
