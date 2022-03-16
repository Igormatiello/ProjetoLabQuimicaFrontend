import { Injectable } from "@angular/core";
import { CrudService } from "../../generic/crud.service";
import { Serviico } from "./serviico";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class ServicoService extends CrudService<Serviico, number> {
    constructor(http: HttpClient) {
        super(environment.api + "/servico", http);
    }

    findByEquipamento(equipamento: number): Observable<Serviico[]> {
        return this.http.get<Serviico[]>(
            `${this.getUrl()}/equipamento?equipamento=${equipamento}`
        );
    }
}
