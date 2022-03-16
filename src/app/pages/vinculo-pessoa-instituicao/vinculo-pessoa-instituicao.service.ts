import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CrudService} from "../../generic/crud.service";
import {PessoaInstituicao} from "./pessoaInstituicao";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VinculoPessoaInstituicaoService extends CrudService<PessoaInstituicao, number>{

    constructor(http: HttpClient) {
        super(`${environment.api}/pessoa-instituicao`, http);
    }

    findInstituicoes(pessoaId: number): Observable<PessoaInstituicao[]> {
        const url = `${this.getUrl()}/instituicoes/${pessoaId}`;
        return this.http.get<PessoaInstituicao[]>(url);
    }

    findByInstituicaoSemUsuario(instituicaoId: number): Observable<PessoaInstituicao[]> {
        const url = `${this.getUrl()}/instituicao-sem-usuario/${instituicaoId}`;
        return this.http.get<PessoaInstituicao[]>(url);
    }
}
