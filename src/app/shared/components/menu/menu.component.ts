import { Component, OnInit } from "@angular/core";

import { MenuItem } from "primeng/api";
import { LoginService } from "src/app/pages/login/login.service";

@Component({
    selector: "app-menu",
    templateUrl: "./menu.component.html",
    styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
    itensVertical: MenuItem[];

    rotas: any[] = [
        {
            label: "Cadastros",
            roles: ["ADMIN"],
            icon: "pi pi-pw pi-pencil",
            items: [
                {
                    label: "Pessoas",
                    icon: "pi pi-fw pi-user",
                    roles: ["ADMIN"],
                    routerLink: "pessoa"
                },
                {
                    label: "Cidades",
                    icon: "pi pi-fw pi-globe",
                    roles: ["ADMIN"],
                    routerLink: "cidade"
                },
                {
                    label: "Programas de Ensino",
                    icon: "pi pi-fw pi-bookmark",
                    roles: ["ADMIN"],
                    routerLink: "prgEnsino"
                },
                {
                    label: "Equipamentos",
                    icon: "pi pi-fw pi-cog",
                    roles: ["ADMIN"],
                    routerLink: "equipamento"
                },
                {
                    label: "Instituições",
                    icon: "pi pi-fw pi-home",
                    roles: ["ADMIN"],
                    routerLink: "instituicao"
                },
                {
                    label: "Solicitações de Cadastro",
                    icon: "pi pi-fw pi-user-plus",
                    roles: ["ADMIN"],
                    routerLink: "solicitacao-cadastro"
                },
                {
                    label: "Vínculos",
                    roles: ["ADMIN"],
                    icon: "",
                    items: [
                        {
                            label: "Instituição - Programa de Ensino",
                            icon: "pi pi-fw pi-user-plus",
                            roles: ["ADMIN"],
                            routerLink: "vinculo"
                        },
                        {
                            label: "Pessoa - Insituição",
                            icon: "pi pi-fw pi-user-minus",
                            roles: ["ADMIN"],
                            routerLink: "pessoa-instituicao"
                        }]
                },
            ]
        },
        {
            label: "Formulários",
            roles: ["ADMIN", "SOLICITANTE"],
            icon: "pi pi-pw pi-folder-open",
            items: [
                {
                    label: "Histórico de formulários",
                    icon: "pi pi-fw pi-tags",
                    routerLink: "historico-formularios",
                    roles: ["SOLICITANTE"]
                },
                {
                    label: "Lançar formulário",
                    icon: "pi pi-fw pi-dollar",
                    routerLink: "novo-formulario",
                    roles: ["SOLICITANTE"]
                },
                {
                    label: "Formulários em espera",
                    icon: "pi pi-clock",
                    routerLink: "formulario-em-espera",
                    roles: ["ADMIN"]
                },
                {
                    label: "Formulários em análise",
                    icon: "pi pi-file-o",
                    routerLink: "formulario-em-analise",
                    roles: ["ADMIN"]
                },
                {
                    label: "Formulários encerrados",
                    icon: "pi pi-file",
                    routerLink: "formulario-finalizado",
                    roles: ["ADMIN"]
                }
            ]
        },
        {
            label: "Financeiro",
            icon: "pi pi-pw pi-dollar",
            roles: ["ADMIN","SOLICITANTE"],
            items: [
                {
                    label: "Créditos dos professores",
                    icon: "pi pi-ticket",
                    routerLink: "creditoProfessor",
                    roles: ["ADMIN"]
                },
                {
                    label: "Histórico Financeiro",
                    icon: "pi pi-money-bill",
                    routerLink: "historico-financeiro",
                    roles: ["ADMIN"]
                }, 
                {
                    label: "Histórico de Crédito",
                    icon: "pi pi-clock",
                    routerLink: "historicoCredito",
                    roles: ["ADMIN","SOLICITANTE"]
                }
            ]
        },
        {
            label: "Configurações",
            icon: "pi pi-pw pi-cog",
            roles: ["ADMIN"],
            items: [
                {
                    label: "Email",
                    icon: "pi pi-envelope",
                    routerLink: "conf-email",
                    roles: ["ADMIN"]
                }
            ]
        }
    ];

    constructor(private loginService: LoginService) {}

    ngOnInit() {
        this.itensVertical = [];

        this.loginService.getUserInfo().then(info => {
            const userRoles = info.authorities.map((x: any) =>
                x.nome.replace("ROLE_", "")
            );

            this.rotas.forEach((r: any) => {
                let routeAux = null;

                if (
                    r.roles.filter(value => -1 !== userRoles.indexOf(value))
                        .length > 0
                ) {
                    routeAux = r;
                    let items = [];

                    if (routeAux.items) {
                        routeAux.items.forEach((childRoute: any) => {
                            if (
                                childRoute.roles.filter(
                                    value => -1 !== userRoles.indexOf(value)
                                ).length > 0
                            ) {
                                items.push(childRoute);
                            }
                        });
                    }
                    routeAux.items = items;
                    this.itensVertical.push(routeAux);
                }
            });
        });
    }
}
