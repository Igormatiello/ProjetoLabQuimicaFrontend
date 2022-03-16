import { Component, Input, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { LoginService } from "../../../pages/login/login.service";
import { PerfilService } from "src/app/pages/perfil/perfil.service";
import { ConstantPool } from "@angular/compiler";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
    constructor(
        private loginService: LoginService,
        private perfilService: PerfilService
    ) {}

    nome: string;

    ngOnInit() {
        this.loginService.getUserInfo().then(x => {
            this.nome = x.principal.pessoa.nome;
        });
    }

    logout() {
        this.loginService.logout();
    }

    editarPerfil() {
        this.perfilService.editarPerfil();
    }
}
