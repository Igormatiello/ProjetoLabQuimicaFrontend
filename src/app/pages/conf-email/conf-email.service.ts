import {Injectable} from "@angular/core";
import {CrudService} from "../../generic/crud.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ConfEmail} from "./conf-email";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ConfEmailService extends CrudService<ConfEmail, number> {

    constructor(http: HttpClient) {
        super(`${environment.api}/conf-email`, http);
    }

    findConf(): Observable<ConfEmail> {
        return this.http.get<ConfEmail>(this.getUrl() + `/find-conf-geral`);
    }

    testeEnvio(): Observable<void> {
        return this.http.get<void>(this.getUrl() + `/teste-envio`);
    }
}
