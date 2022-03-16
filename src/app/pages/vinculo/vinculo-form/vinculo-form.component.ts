import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastService} from '../../../shared/components/toast/toast.service';
import {VinculoService} from '../vinculo.service';
import {SelectItem} from 'primeng/api';
import {Vinculo} from '../vinculo';
import {InstituicaoService} from '../../instituicao/instituicao.service';
import {LabelValue} from '../../../shared/classes/LabelValue';
import {PessoaService} from '../../pessoa/pessoa.service';
import {pt} from '../../../shared/internalization/CalendarPt';
import {PrgEnsinoService} from '../../programaEnsino/prg-ensino.service';
import {throwError} from 'rxjs';

@Component({
    selector: 'app-vinculo',
    templateUrl: './vinculo-form.component.html',
    styleUrls: ['./vinculo-form.component.css']
})
export class VinculoFormComponent implements OnInit {
    form: FormGroup;
    vinculo: Vinculo;
    ativoOption: SelectItem[];
    ehProfessor: boolean;
    programaOption: LabelValue[] = [];
    pessoaOption: LabelValue[] = [];
    ptCalendar = pt;
    pessoaValida: boolean;

    constructor(
        private pessoaService: PessoaService,
        private vinculoService: VinculoService,
        private instituicaoService: InstituicaoService,
        protected router: Router,
        private route: ActivatedRoute,
        private toastService: ToastService,
        private programaService: PrgEnsinoService,
    ) {
        this.form = new FormBuilder().group({
            id: [''],
            dataTermino: ['', Validators.required],
            ehAtivo: ['', Validators.required],
            orientador: ['', Validators.required],
            participante: ['', Validators.required],
            programaEnsino: ['', Validators.required],
        });

        this.ativoOption = [
            {label: 'Ativo', value: true},
            {label: 'Inativo', value: false}
        ];
    }

    ngOnInit() {
        this.pessoaValida = false;
        const id = Number(this.route.snapshot.params.id);
        if (id) {
            this.vinculoService.findOne(id).subscribe(e => {
                this.form.patchValue(e);
                this.setProfessor({
                    value: e.orientador.ehProfessor
                });
            });
        } else {
            this.vinculo = new Vinculo();
        }
        this.buscaPrograma();
        this.buscaPessoasInstituicao();
    }

    setProfessor({value}) {
        this.ehProfessor = value === 'S';
    }

    cancel() {
        this.router.navigate(['vinculo']);
    }

    save() {
        if (this.form.valid) {
            const vinculo = this.form.getRawValue();
            this.saveVinculoService(vinculo);
        } else {
            this.toastService.showWarn(
                'Atenção!',
                'Informe os campos obrigatórios.'
            );
        }
    }

    saveVinculoService(vinculo: Vinculo) {
        this.vinculoService.save(vinculo).subscribe(
            () => {
                this.toastService.showSuccess(
                    'Sucesso',
                    'Registro salvo com sucesso!'
                );
                this.router.navigate(['vinculo']);
            },
            error => {
                this.toastService.showError(
                    'Atenção',
                    'Não foi possível concluir a ação'
                );
            }
        );
    }

    private buscaPrograma() {
        this.programaService.findAll().subscribe(
            programa => {
                this.programaOption =
                    programa.map(programa => ({
                        label: `${programa.nome} - ${programa.sigla}`,
                        value: programa
                    })) || [];

                if (this.form.value.instituicao === '') {
                    this.form.setValue({
                        ...this.form.value,
                        cidade: this.programaOption[0].value
                    });
                }
            },
            error => {
                this.toastService.showError(
                    'Atenção',
                    'Não foi possível buscar as instituições.'
                );
            }
        );
    }

    buscaPessoasInstituicao() {
        this.vinculoService.findAll2().subscribe(
            pessoaInstituicao => {
                this.pessoaOption =
                    pessoaInstituicao.map(pessoaInstituicao => ({
                        label: `${pessoaInstituicao.pessoa.nome}`,
                        value: pessoaInstituicao
                    })) || [];
            },
            error => {
                this.toastService.showError(
                    'Atenção',
                    'Não foi possível buscar as pessoas.'
                );
            }
        );
    }

    validarPessoa() {
        this.pessoaValida = this.form.controls['orientador'].value !== this.form.controls['participante'].value;

        if (!this.pessoaValida) {
            this.toastService.showError(
                'Atenção',
                'Orientador não pode ser o mesmo que o participante.'
            );
        }
    }

    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        this.toastService.showError('Erro!', errorMessage, 2000, true);
        return throwError(errorMessage);
    }
}
