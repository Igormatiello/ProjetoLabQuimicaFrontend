import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {distinctUntilChanged} from 'rxjs/operators';
import {LabelValue} from 'src/app/shared/classes/LabelValue';
import {UF} from 'src/app/shared/consts/UF';
import {Cidade} from '../cidade';
import {CidadeService} from '../cidade.service';

@Component({
    selector: 'app-cidade-form',
    templateUrl: './cidade-form.component.html',
    styleUrls: ['./cidade-form.component.css']
})
export class CidadeFormComponent implements OnInit {

    listaUfs: LabelValue[] = UF;
    form: FormGroup;
    cidade: Cidade;

    constructor(private cidadeService: CidadeService, protected router: Router, private route: ActivatedRoute) {
        this.form = new FormBuilder().group({
            id: [''],
            nome: ['', Validators.required],
            uf: ['', Validators.required],
        });

    }

    ngOnInit() {
        this.verificaAlteracaoUF();
        const id = Number(this.route.snapshot.params.id);
        if (id) {
            this.cidadeService.findOne(id).subscribe(e => this.form.patchValue(e));
        } else {
            this.cidade = new Cidade();
        }
    }

    verificaAlteracaoUF() {
        this.form.get('uf').valueChanges.pipe(distinctUntilChanged()).subscribe(uf => {
        });
    }

    cancel() {
        this.router.navigate(['cidade']);
    }

    save() {
        const cidade = this.form.getRawValue();
        this.saveCidadeService(cidade);
    }

    saveCidadeService(cidade: Cidade) {
        this.cidadeService.save(cidade).subscribe(() => {
            this.router.navigate(['cidade']);
        }, error => {
        });
    }

}
