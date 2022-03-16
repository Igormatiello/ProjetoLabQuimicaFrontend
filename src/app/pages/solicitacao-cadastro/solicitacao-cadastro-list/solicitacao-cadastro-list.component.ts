import {Component, OnInit} from '@angular/core';
import {SolicitacaoCadastro} from "../solicitacao-cadastro";
import {SolicitacaoCadastroService} from "../solicitacao-cadastro.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-solicitacao-cadastro-list',
    templateUrl: './solicitacao-cadastro-list.component.html',
    styleUrls: ['./solicitacao-cadastro-list.component.css']
})
export class SolicitacaoCadastroListComponent implements OnInit {

    solicitacoesCadastro: SolicitacaoCadastro[];

    constructor(private solicitacaoCadastroService: SolicitacaoCadastroService, protected router: Router) {
    }

    ngOnInit() {
        this.findAll();
    }

    findAll() {
        this.solicitacaoCadastroService.findAll().subscribe(solicitacoesCadastro => {
            this.solicitacoesCadastro = solicitacoesCadastro;
        });
    }
}
