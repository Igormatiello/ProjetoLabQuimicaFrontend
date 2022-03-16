import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PrgEnsinoService} from "../prg-ensino.service";
import {PrgEnsino} from "../prgEnsino";

@Component({
  selector: 'app-prg-ensino-list',
  templateUrl: './prg-ensino-list.component.html',
  styleUrls: ['./prg-ensino-list.component.css']
})
export class PrgEnsinoListComponent implements OnInit {

    prgEnsinos: PrgEnsino[];

    constructor(
        private prgEnsinoService: PrgEnsinoService,
        protected router: Router,
    ) {
    }

    ngOnInit() {
        this.findAll();
    }

    findAll() {
        this.prgEnsinoService.findAll().subscribe(prgEnsinos => {
            this.prgEnsinos = prgEnsinos;
        });
    }

    newEntity() {
        this.router.navigate(['prgEnsino', 'novo']);
    }
    delete(id: number) {
        this.prgEnsinoService.delete(id).subscribe(() => {
            this.findAll();
        });
    }

}
