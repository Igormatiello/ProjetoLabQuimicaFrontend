import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Message, MessageService } from 'primeng/api';

import { LoginService } from './login.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  msgs: Message[] = [];
  form: FormGroup;

  @Input() usuarioFoiAutenticado: boolean = false;
  @Output() mostrarMenu: EventEmitter<any> = new EventEmitter();
  @Output() ocultarMenu: EventEmitter<any> = new EventEmitter();

  constructor(private loginService: LoginService,
    private router: Router,
    private messageService: MessageService) {
    this.form = new FormBuilder().group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (token) {
      this.router.navigate(['']);
    }

  }

  login() {
    this.loginService.login(this.form.controls.username.value, this.form.controls.password.value).subscribe(e => {
      this.router.navigate(['/']);
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuário e/ou senha incorreto(s)!' });

      this.msgs = [{
        severity: 'error', summary: 'Error',
        detail: 'Usuário e/ou senha incorreto(s)!'
      }];
    });
  }

  abrirCadastro() {
    this.router.navigate(['/registro']);
  }

  abrirEsqueciMinhaSenha() {
  }

  enterPressionado(event) {
      this.login();
  }

}
