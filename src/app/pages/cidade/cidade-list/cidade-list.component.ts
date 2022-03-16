import { Component, OnInit } from '@angular/core';
import { Cidade } from '../cidade';
import { CidadeService } from '../cidade.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-cidade',
    templateUrl: './cidade-list.component.html',
    styleUrls: ['./cidade-list.component.css']
})
export class CidadeListComponent implements OnInit {

    listaUfs: any[] = [];

    cidades: Cidade[];

    constructor(
        private cidadeService: CidadeService,
        protected router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.findAll();
    }

    findAll() {
        this.cidadeService.findAll().subscribe(cidades => {
            this.cidades = cidades;
        });
    }

    newEntity() {
        this.router.navigate(['cidade', 'novo']);
    }


    delete(id: number) {
        this.cidadeService.delete(id).subscribe(() => {
            this.findAll();
        });
    }

}
