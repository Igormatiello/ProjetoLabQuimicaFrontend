import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { CrudService } from "src/app/generic/crud.service";
import { environment } from "src/environments/environment";

import { Equipamento } from "./Equipamento";

@Injectable({
    providedIn: "root"
})
export class EquipamentoService extends CrudService<Equipamento, number> {
    constructor(protected http: HttpClient) {
        super(`${environment.api}/equipamento`, http);
    }
}
