import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {distinctUntilChanged} from "rxjs/operators";
import {FormHelper} from "../../../shared/classes/FormHelper";
import {PrgEnsino} from "../prgEnsino";
import {PrgEnsinoService} from "../prg-ensino.service";

@Component({
    selector: 'app-prg-ensino-form',
    templateUrl: './prg-ensino-form.component.html',
    styleUrls: ['./prg-ensino-form.component.css']
})
export class PrgEnsinoFormComponent implements OnInit {
    form: FormGroup;
    prgEnsino: PrgEnsino;

    constructor(private prgEnsinoService: PrgEnsinoService,
                protected router: Router,
                private route: ActivatedRoute) {
        this.form = new FormBuilder().group({
            id: [''],
            nome: ['', Validators.required],
            sigla: ['', Validators.required],
        });
    }

    ngOnInit() {
        const id = Number(this.route.snapshot.params.id);
        if (id) {
            this.prgEnsinoService.findOne(id).subscribe(e => this.form.patchValue(e));
        } else {
            this.prgEnsino = new PrgEnsino();
        }
    }

    cancel() {
        this.router.navigate(['prgEnsino']);
    }

    save() {
        const prgEnsino = this.form.getRawValue();
        this.savePrgEnsinoService(prgEnsino);
    }


    savePrgEnsinoService(prgEnsino: PrgEnsino) {
        this.prgEnsinoService.save(prgEnsino).subscribe(() => {
            this.router.navigate(['prgEnsino']);
        }, error => {
        });
    }

}


