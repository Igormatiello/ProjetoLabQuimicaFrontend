import { Injectable } from "@angular/core";
import { CrudService, httpOptions } from "../../generic/crud.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { ParticipacaoProgramaEnsino } from "./participacao-programa-ensino";

@Injectable({
    providedIn: "root"
})
export class ParticipacaoProgramaEnsinoService extends CrudService<
    ParticipacaoProgramaEnsino,
    number
> {
    constructor(http: HttpClient) {
        super(`${environment.api}/participacao-programa-ensino`, http);
    }

    findProgramasEnsinoPessoaInstituicaoId(
        pessoaInstituicaoId: number
    ): Observable<ParticipacaoProgramaEnsino[]> {
        return this.http.get<ParticipacaoProgramaEnsino[]>(
            `${this.getUrl()}/pessoa-instituicao/${pessoaInstituicaoId}`,
            httpOptions
        );
    }
}
