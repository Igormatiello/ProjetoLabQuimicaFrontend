import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Indicadores} from "./indicadoresModel/indicadores";

@Injectable()
export class HomeService {

    constructor(private http: HttpClient,
                private router: Router) {
    }

    protected getUrl(): string {
        return `${environment.api}/home`;
    }

    findDadosIndicadores(dtIni: string, dtFim: string): Observable<Indicadores> {
        return this.http.get<Indicadores>(this.getUrl() + `/find-dados-indicadores?dtIni=${dtIni}&dtFim=${dtFim}`);
    }
}
