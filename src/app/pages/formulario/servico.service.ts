import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { CrudService } from "src/app/generic/crud.service";
import { environment } from "src/environments/environment";
import { Serviico } from "../equipamento/serviico";
import { Observable } from "rxjs";
import { ActionResult } from "src/app/shared/classes/ActionResult";

@Injectable({
    providedIn: "root"
})
export class ServicoService extends CrudService<any, number> {
    constructor(protected http: HttpClient) {
        super(`${environment.api}/servico`, http);
    }

    findServicosEquipamento(equipamentoId: number): Observable<Serviico[]> {
        const url = `${this.getUrl()}/equipamento?equipamento=${equipamentoId}`;

        return this.http.get<Serviico[]>(url);
    }
}
