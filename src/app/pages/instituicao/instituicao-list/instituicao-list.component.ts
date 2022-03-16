import { Component, OnInit } from '@angular/core';
import { Instituicao } from '../instituicao';
import { InstituicaoService } from '../instituicao.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-instituicao',
    templateUrl: './instituicao-list.component.html',
    styleUrls: ['./instituicao-list.component.css']
})
export class InstituicaoListComponent implements OnInit {

    listaUfs: any[] = [];

    instituicoes: Instituicao[];

    constructor(
        private instituicaoService: InstituicaoService,
        protected router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.findAll();
    }

    findAll() {
        this.instituicaoService.findAll().subscribe(instituicoes => {
            this.instituicoes = instituicoes;
        });
    }

    newEntity() {
        this.router.navigate(['instituicao', 'novo']);
    }

    delete(id: number) {
        this.instituicaoService.delete(id).subscribe(() => {
            this.findAll();
        });
    }
}
