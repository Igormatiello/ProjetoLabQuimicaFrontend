import {Injectable} from '@angular/core';
import {CrudService, httpOptions} from '../../generic/crud.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from "rxjs";
import { HistoricoCredito } from './historicoCredito';

@Injectable({
    providedIn: 'root'
})
export class HistoricoCreditoService extends CrudService<HistoricoCredito, number> {

    constructor(http: HttpClient) {
        super(`${environment.api}/historicoCredito`, http);
    }

    buscarCreditoPorProfessor(): Observable<HistoricoCredito[]> {
        return this.http.get<HistoricoCredito[]>(`${this.getUrl()}/busca-por-professor/`);
    }

}
