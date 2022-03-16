import {Component, OnInit} from '@angular/core';
import {HistoricoFinanceiro} from "./historicoFinanceiro";
import {HistoricoFinanceiroService} from "./historico-financeiro.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-historico-financeiro',
  templateUrl: './historico-financeiro.component.html',
  styleUrls: ['./historico-financeiro.component.css']
})
export class HistoricoFinanceiroComponent implements OnInit {

    historicoFinanceiro: HistoricoFinanceiro[];
    cols: any[];
    historicoFinanceiroo = new HistoricoFinanceiro();

  constructor(
      private historicoFinanceiroService: HistoricoFinanceiroService,
      protected router: Router
  ) {}

  ngOnInit() {

      this.findAll();

      this.cols = [
          { field: 'formulario.pessoa.nome', header: 'Professor' },
          { field: 'formulario.id', header: 'Número da análise' },
          { field: 'formulario.creditoProfessor.nomeProjeto', header: 'Projeto' },
          { field: 'dataPagamento', header: 'Data do pagamento' },
          { field: 'valor', header: 'valor' }
      ];
  }

    findAll() {
        this.historicoFinanceiroService.findAll().subscribe((dados) => {
            this.historicoFinanceiro = dados;
            console.log(dados);
        });
    }

}
