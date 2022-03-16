import {Injectable} from '@angular/core';
import {CrudService} from "../../../generic/crud.service";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {HistoricoFinanceiro} from "./historicoFinanceiro";

@Injectable({
  providedIn: 'root'
})
export class HistoricoFinanceiroService extends CrudService<HistoricoFinanceiro, number> {

  constructor(http: HttpClient) {
      super(`${environment.api}/lancamento-financeiro`, http);
  }
}
