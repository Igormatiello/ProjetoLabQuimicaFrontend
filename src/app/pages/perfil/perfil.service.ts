import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from '../pessoa/pessoa';
import { Usuario } from './usuario';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DadosPessoaViewModel } from './dados-pessoa-view-model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http: HttpClient, private router: Router) {  }

  protected getUrl(): string {
    return `${environment.api}/session/dados-usuario`;
  }

  findOne(): Observable<DadosPessoaViewModel> {
    const url = `${this.getUrl()}`;
    return this.http.get<DadosPessoaViewModel>(url);
  }
  
  editarPerfil(){
    this.router.navigate(["/perfil"]); 
  }
}
