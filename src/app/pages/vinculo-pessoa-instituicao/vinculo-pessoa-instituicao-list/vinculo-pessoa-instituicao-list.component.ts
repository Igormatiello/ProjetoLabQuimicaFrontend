import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PessoaService} from "../../pessoa/pessoa.service";
import {LabelValue} from "../../../shared/classes/LabelValue";
import {VinculoPessoaInstituicaoService} from "../vinculo-pessoa-instituicao.service";
import {PessoaInstituicao} from "../pessoaInstituicao";
import {ToastService} from "../../../shared/components/toast/toast.service";
import {Pessoa} from "../../pessoa/pessoa";

@Component({
  selector: 'app-vinculo-pessoa-instituicao-list',
  templateUrl: './vinculo-pessoa-instituicao-list.component.html',
  styleUrls: ['./vinculo-pessoa-instituicao-list.component.css']
})
export class VinculoPessoaInstituicaoListComponent implements OnInit {
    pessoasOption: LabelValue[] = [];
    pessoaInstituicoes: PessoaInstituicao[];
    pessoaSelecionada: Pessoa;

  constructor(
      private vinculoPessoaInstituicaoService: VinculoPessoaInstituicaoService,
      private pessoaService: PessoaService,
      protected router: Router,
      private toastService: ToastService,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {
      this.buscaPessoas();
  }

    buscaInstituicoes() {
        console.log(this.pessoaInstituicoes);
        this.vinculoPessoaInstituicaoService.findInstituicoes(this.pessoaSelecionada.id).subscribe(instituicoes => this.pessoaInstituicoes = instituicoes);
    }
    buscaPessoas() {
        this.pessoaService.findAll().subscribe(
            pessoas => {
                this.pessoasOption =
                    pessoas.map(pessoa => ({
                        label: `${pessoa.nome}`,
                        value: pessoa
                    })) || [];

            },
            error => {
                console.log(error);
            }
        );
    }

    delete(id: number) {
        this.vinculoPessoaInstituicaoService.delete(id).subscribe(() => {
            this.buscaInstituicoes();
        },error1 =>{
            this.toastService.showError(
                "Algo não deu certo!",
                "Verifique se essa pessoa não está atrelada à uma análise."
            );
        } );
    }

}
