import { Injectable } from "@angular/core";
import { CrudService, httpOptions } from "../../generic/crud.service";
import { SolicitacaoCadastro } from "./solicitacao-cadastro";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { ActionResult } from 'src/app/shared/classes/ActionResult';

@Injectable({
    providedIn: "root"
})
export class SolicitacaoCadastroService extends CrudService<
    SolicitacaoCadastro,
    number
> {
    constructor(protected http: HttpClient) {
        super(`${environment.api}/solicitacao-cadastro`, http);
    }

    saveSolicitacaoCadastro(
        t: SolicitacaoCadastro
    ): Observable<ActionResult> {
        const url = `${this.getUrl()}/new`;

        return this.http.post<ActionResult>(
            url,
            JSON.stringify(t),
            httpOptions
        );
    }
}
