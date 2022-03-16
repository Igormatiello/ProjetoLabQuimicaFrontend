import {Injectable} from '@angular/core';
import {CrudService, httpOptions} from '../../generic/crud.service';
import {Pessoa} from './pessoa';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from "rxjs";
import {ActionResult} from "../../shared/classes/ActionResult";

@Injectable({
    providedIn: 'root'
})
export class PessoaService extends CrudService<Pessoa, number> {

    constructor(http: HttpClient) {
        super(`${environment.api}/pessoa`, http);
    }

    savePessoa(
        t: Pessoa
    ): Observable<Pessoa> {
        const url = `${this.getUrl()}/new`;

        return this.http.post<Pessoa>(
            url,
            JSON.stringify(t),
            httpOptions
        );
    }

    buscarDadosAprovacao(id: number): Observable<any> {
        const url = `${this.getUrl()}/dados-aprovacao/${id}`;
        return this.http.get<any>(url);
    }

    salvarAprovacao(t: any): Observable<ActionResult> {
        const url = `${this.getUrl()}/aprovar-solicitacao`;

        return this.http.post<ActionResult>(
            url,
            JSON.stringify(t),
            httpOptions
        );
    }

    buscaProfessores(): Observable<any> {
        const url = `${this.getUrl()}/buscaProfessor`;
        return this.http.get<any>(url);
    }

    buscaProfessoresFormulario(
        pessoaInstituicaoId: number
    ): Observable<Pessoa[]> {
        return this.http.get<Pessoa[]>(
            `${this.getUrl()}/buscaProfessorFormulario/${pessoaInstituicaoId}`,
            httpOptions
        );
    }

    buscaPessoaIdProfessorLogado(): Observable<Pessoa[]> {
        return this.http.get<Pessoa[]>(
            `${this.getUrl()}/buscaPessoaIdProfessorLogado`,
            httpOptions
        );
    }
}
