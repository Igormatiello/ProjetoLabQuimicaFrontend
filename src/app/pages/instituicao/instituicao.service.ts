import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/generic/crud.service';
import { environment } from '../../../environments/environment';
import { Instituicao } from './instituicao';

@Injectable({
    providedIn: 'root'
})
export class InstituicaoService extends CrudService<Instituicao, number> {

    constructor(http: HttpClient) {

        super(`${environment.api}/instituicao`, http);
    }
}
