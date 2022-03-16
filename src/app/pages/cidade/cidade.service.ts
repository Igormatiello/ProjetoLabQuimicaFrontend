import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/generic/crud.service';
import { environment } from '../../../environments/environment';
import { Cidade } from './cidade';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CidadeService extends CrudService<Cidade, number> {

    constructor(http: HttpClient) {

        super(`${environment.api}/cidade`, http);
    }

    findCidadeByNomeLike(nome: string): Observable<Cidade> {
        const url = `${this.getUrl()}/findByNomeLike`;
        return this.http.get<Cidade>(url);
    }
}
