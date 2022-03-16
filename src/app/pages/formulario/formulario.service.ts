import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { CrudService, httpOptions } from "src/app/generic/crud.service";
import { environment } from "src/environments/environment";
import { MudaStatus } from "./mudaStatus";
import { Observable } from "rxjs";
import { ActionResult } from "src/app/shared/classes/ActionResult";

import { Formulario } from "./formulario";

@Injectable({
    providedIn: "root"
})
export class FormularioService extends CrudService<any, number> {
    analise: any;
  laudo: any;
    constructor(protected http: HttpClient) {
        super(`${environment.api}/formulario`, http);
    }

    mudaStatus(id: number, corpo: MudaStatus): Observable<ActionResult> {
        const url = `${this.getUrl()}/${id}/muda-status`;

        return this.http.post<ActionResult>(
            url,
            JSON.stringify(corpo),
            httpOptions
        );
    }    

    buscaPorPessoa(): Observable<Formulario[]> {
        return this.http.get<Formulario[]>(`${this.url}/busca-por-pessoa`);
    }

    buscaFormulariosPessoaJuridica(): Observable<Formulario[]> {
        return this.http.get<Formulario[]>(`${this.url}/buscaFormulariosPessoaJuridica`);
    }
}
