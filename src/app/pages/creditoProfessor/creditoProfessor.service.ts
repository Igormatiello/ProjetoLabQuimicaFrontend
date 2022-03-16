import {Injectable} from '@angular/core';
import {CrudService, httpOptions} from '../../generic/crud.service';
import {CreditoProfessor} from './creditoProfessor';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from "rxjs";
import {ActionResult} from "../../shared/classes/ActionResult";

@Injectable({
    providedIn: 'root'
})
export class CreditoProfessorService extends CrudService<CreditoProfessor, number> {

    constructor(http: HttpClient) {
        super(`${environment.api}/creditoProfessor`, http);
    }

    saveCredito(
        form: CreditoProfessor
    ): Observable<ActionResult> {
        const url = `${environment.api}/creditoProfessor/novo`;

        return this.http.post<ActionResult>(
            url,
            form
        );
    }

    buscaProfessoresFormulario(
        pessoaId: number
    ): Observable<CreditoProfessor[]> {
        return this.http.get<CreditoProfessor[]>(
            `${this.getUrl()}/buscaCreditosPorProfessor/${pessoaId}`,
            httpOptions
        );
    }

}
