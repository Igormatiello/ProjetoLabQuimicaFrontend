import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {CrudService} from '../../generic/crud.service';
import {Vinculo} from './vinculo';
import {Observable} from 'rxjs';
import {PessoaInstituicao} from './pessoaInstituicao';

@Injectable({
    providedIn: 'root'
})
export class VinculoService extends CrudService<Vinculo, number> {

    constructor(http: HttpClient) {
        super(`${environment.api}/participacao-programa-ensino`, http);
    }

    findAll2(): Observable<PessoaInstituicao[]> {
        const url = `${environment.api}/pessoa-instituicao`;
        return this.http.get<PessoaInstituicao[]>(url);
    }

    filterByPessoa(id: any): Observable<Vinculo[]> {
        const url = `${environment.api}/participacao-programa-ensino/pessoa-instituicao/${id}`;
        return this.http.get<Vinculo[]>(url);
    }
}
