import { Injectable } from '@angular/core';
import {PrgEnsino} from "./prgEnsino";
import {HttpClient} from "@angular/common/http";
import { CrudService } from 'src/app/generic/crud.service';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PrgEnsinoService extends CrudService<PrgEnsino, number>{

    constructor(http: HttpClient) {

        super(`${environment.api}/programa-ensino`, http);
    }
}
