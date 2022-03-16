import {Component, OnInit} from '@angular/core';
import {Vinculo} from '../vinculo';
import {VinculoService} from '../vinculo.service';
import {Router} from '@angular/router';
import {ToastService} from '../../../shared/components/toast/toast.service';
import {PessoaService} from '../../pessoa/pessoa.service';
import {LabelValue} from '../../../shared/classes/LabelValue';

@Component({
    selector: 'app-vinculo-list',
    templateUrl: './vinculo-list.component.html',
    styleUrls: ['./vinculo-list.component.css']
})
export class VinculoListComponent implements OnInit {
    vinculos: Vinculo[];
    cols: any[];
    pessoasOption: LabelValue[] = [];

    constructor(
        private vinculoService: VinculoService,
        protected router: Router,
        private toastService: ToastService,
    ) {
    }

    ngOnInit() {
        this.findAll();
        this.buscaPessoasInstituicao();

        this.cols = [
            {field: 'orientador.pessoa.nome', header: 'Orientador'},
            {field: 'orientador.creditoVigente', header: 'Crédito'},
            {field: 'participante.pessoa.nome', header: 'Participante'},
            // {field: 'instituicao.nome', header: 'Instituição'},
            // {field: 'tipoInstituicao', header: 'Tipo Instituição'},
            {field: 'programaEnsino.nome', header: 'Programa Ensino'},
            {field: 'dataTermino', header: 'Dt. Término'},
        ];
    }

    resolveFieldData(data: any, field: string): any {
        if (data && field) {
            if (field.indexOf('.') == -1) {
                return data[field];
            }
            else {
                let fields: string[] = field.split('.');
                let value = data;
                for (var i = 0, len = fields.length; i < len; ++i) {
                    if (value == null) {
                        return null;
                    }
                    value = value[fields[i]];
                }
                return value;
            }
        }
        else {
            return null;
        }
    }

    findAll() {
        this.vinculoService.findAll().subscribe(vinculos => {
            this.vinculos = vinculos;
        });
    }

    newEntity() {
        this.router.navigate(['vinculo', 'novo']);
    }

    delete(id: number) {
        this.vinculoService.delete(id).subscribe(
            () => {
                this.toastService.showSuccess(
                    'Sucesso',
                    'Registro deletado com sucesso!'
                );
                this.findAll();
            },
            () => {
                this.toastService.showError(
                    'Atenção',
                    'Não foi possível concluir a ação.'
                );
            }
        );
    }

    buscaPessoasInstituicao() {
        this.vinculoService.findAll2().subscribe(
            pessoaInstituicao => {
                this.pessoasOption =
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

    pesquisar(pessoa) {
        this.vinculoService.filterByPessoa(pessoa).subscribe(vinculos => {
            this.vinculos = vinculos;
        });
    }
}
