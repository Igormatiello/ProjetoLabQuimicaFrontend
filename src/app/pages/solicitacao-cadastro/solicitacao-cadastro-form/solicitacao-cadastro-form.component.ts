import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../../shared/components/toast/toast.service";
import {PessoaService} from "../../pessoa/pessoa.service";
import {LabelValue} from "../../../shared/classes/LabelValue";
import {Pessoa} from "../../pessoa/pessoa";
import {SelectItem} from "primeng/api";
import {CidadeService} from "../../cidade/cidade.service";
import {pt} from "../../../shared/internalization/CalendarPt";
import {InstituicaoService} from "../../instituicao/instituicao.service";
import {PrgEnsinoService} from "../../programaEnsino/prg-ensino.service";
import {VinculoPessoaInstituicaoService} from "../../vinculo-pessoa-instituicao/vinculo-pessoa-instituicao.service";
import {SolicitacaoCadastroService} from "../solicitacao-cadastro.service";
import {getAllErrors} from "../../../shared/utils/formUtils";

@Component({
    selector: 'app-solicitacao-cadastro-form',
    templateUrl: './solicitacao-cadastro-form.component.html',
    styleUrls: ['./solicitacao-cadastro-form.component.css']
})
export class SolicitacaoCadastroFormComponent implements OnInit {

    ehJuridica: boolean;
    ehProfessor: boolean;
    cidadesOption: LabelValue[] = [];
    instituicoesOption: LabelValue[] = [];
    programasEnsinoOption: LabelValue[] = [];
    orientadoresOption: LabelValue[] = [];
    tipoPessoaOption: SelectItem[];
    ativoOption: SelectItem[];
    form: FormGroup;
    ptCalendar = pt;

    constructor(private solicitacaoCadastroService: SolicitacaoCadastroService, private pessoaService: PessoaService, private cidadeService: CidadeService,
                private instituicaoService: InstituicaoService, private programaEnsinoService: PrgEnsinoService, private vinculoPessoaInstituicaoService: VinculoPessoaInstituicaoService,
                protected router: Router, private route: ActivatedRoute, private toastService: ToastService) {
        const formBuilder = new FormBuilder();

        this.form = formBuilder.group({
            id: [''],
            nome: ['', Validators.required],
            documento: ['', Validators.required],
            cidade: ['', Validators.required],
            bairro: ['', Validators.required],
            cep: ['', Validators.required],
            dataTerminoPrograma: ['',],
            email: ['', Validators.required],
            endereco: ['', Validators.required],
            numero: ['', Validators.required],
            telefone: ['', Validators.required],
            tipoPessoa: ['', Validators.required],
            ehProfessor: [''],
            nomeprojeto: [''],
            complemento: [''],
            inscricaoEstadual: [''],
            celular: [''],
            nomeInstituicao: [''],
            instituicao: ['', Validators.required],
            nomeProgramaEnsino: [''],
            programaEnsino: ['', Validators.required],
            cpfOrientador: [''],
            orientador: [''],
        });
        this.tipoPessoaOption = [
            {label: 'Física', value: 'Fisica'},
            {label: 'Jurídica', value: 'Juridica'},
        ];
        this.ativoOption = [
            {label: 'Ativo', value: true},
            {label: 'Inativo', value: false},
        ];
    }

    ngOnInit() {
        const id = Number(this.route.snapshot.params.id);
        if (id) {
            this.pessoaService
                .buscarDadosAprovacao(id)
                .subscribe(e => {
                    this.form.patchValue(e);
                    this.setTipoPessoa({
                        value: e.tipoPessoa
                    });
                    this.ehProfessor = e.ehProfessor;
                });
        }
        this.buscaCidadesService();
        this.buscaInstituicoesService();
        this.buscaProgramaEnsinoService();
    }

    cancel() {
        this.router.navigate(["solicitacao-cadastro"]);
    }

    delete() {
        this.solicitacaoCadastroService.delete(this.form.value.id).subscribe(
            () => {
                this.toastService.showSuccess(
                    "Sucesso",
                    "Recusado com sucesso!"
                );
                this.router.navigate(["solicitacao-cadastro"]);
            },
            () => {
                this.toastService.showError(
                    "Atenção",
                    "Não foi possível concluir a ação."
                );
            }
        );
    }

    save() {
        if (this.form.valid) {
            const pessoa = this.form.getRawValue();
            this.savePessoaService(pessoa);
        }
    }

    savePessoaService(pessoa: any) {
        this.pessoaService.salvarAprovacao(pessoa).subscribe(
            () => {
                this.toastService.showSuccess(
                    "Sucesso",
                    "Aprovado com sucesso!"
                );
                this.router.navigate(["solicitacao-cadastro"]);
            },
            error => {
                this.toastService.showError(
                    "Atenção",
                    "Não foi possível concluir a ação."
                );
            }
        );
    }

    buscaCidadesService() {
        this.cidadeService.findAll().subscribe(cidades => {
            this.cidadesOption = cidades.map(cidade =>
                ({
                    label: `${cidade.nome}, ${cidade.uf}`,
                    value: cidade
                })) || [];

            if (this.form.value.cidade === '') {
                this.form.setValue({
                    ...this.form.value,
                    cidade: this.cidadesOption[0].value
                });
            }
        }, error => {
            console.log(error);
        });
    }

    buscaInstituicoesService() {
        this.instituicaoService.findAll().subscribe(instituicoes => {
            this.instituicoesOption = instituicoes.map(instituicao =>
                ({
                    label: `${instituicao.nome}`,
                    value: instituicao
                })) || [];

            if (!this.form.value.instituicao && this.instituicoesOption.length > 0) {
                this.form.setValue({
                    ...this.form.getRawValue(),
                    instituicao: this.instituicoesOption[0].value
                });
            }
            if (this.form.value.instituicao) {
                this.buscaPessoaInstituicaoService(this.form.getRawValue().instituicao.id);
            }
        }, error => {
            console.log(error);
        });
    }

    buscaProgramaEnsinoService() {
        this.programaEnsinoService.findAll().subscribe(programasEnsino => {
            this.programasEnsinoOption = programasEnsino.map(programaEnsino =>
                ({
                    label: `${programaEnsino.nome}`,
                    value: programaEnsino
                })) || [];
            if (!this.form.value.programaEnsino && this.programasEnsinoOption.length > 0) {
                this.form.setValue({
                    ...this.form.getRawValue(),
                    programaEnsino: this.programasEnsinoOption[0].value
                });
            }
        }, error => {
            console.log('1', error);
        });
    }

    buscaPessoaInstituicaoService(instituicaoId: number) {
        this.vinculoPessoaInstituicaoService.findByInstituicaoSemUsuario(instituicaoId).subscribe(pessoasInstituicao => {
            this.orientadoresOption = pessoasInstituicao.map(pessoaInstituicao =>
                ({
                    label: `${pessoaInstituicao.pessoa.nome}`,
                    value: pessoaInstituicao.pessoa
                })) || [];
        }, error => {
            console.log(error);
        });
    }

    setTipoPessoa({value}) {
        if (value === "Juridica") {
            this.ehJuridica = true;
        } else {
            this.ehJuridica = false;
        }
    }
}
