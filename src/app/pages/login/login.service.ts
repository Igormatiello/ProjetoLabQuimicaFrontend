import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot
} from "@angular/router";
import { Observable, Subject, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { AuthenticationRequest } from "./authentication.request";
import { AuthenticationResponse } from "./authentication.response";
import { environment } from "../../../environments/environment";
import { resolve } from "q";

@Injectable({
    providedIn: "root"
})
export class LoginService {
    userInfo: any;
    isAuthenticated = new Subject<boolean>();
    isRunningRequest: boolean = false;

    constructor(private http: HttpClient, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        const url = `${environment.api}/session/user-info`;
        this.isRunningRequest = true;

        return this.http.get(url).pipe(
            map(e => {
                this.userInfo = e;
                this.isRunningRequest = false;
                this.isAuthenticated.next(true);
                return true;
            }),
            catchError(err => {
                this.isRunningRequest = false;
                this.logout();
                return throwError(new Error("O usuário não está autenticado!"));
            })
        );
    }

    async getUserInfo(): Promise<any> {
        return new Promise<any>(async res => {
            while (this.isRunningRequest) {
                await new Promise(resolve => {
                    setTimeout(() => {
                        resolve();
                    }, 100);
                });
            }
            res(this.userInfo);
        });
    }

    async hasRole(role: string): Promise<boolean> {
        const infos = await this.getUserInfo();

        if (infos && infos.authorities) {
            return (
                infos.authorities.filter(e => e.authority === "ROLE_" + role)
                    .length > 0
            );
        }
        return false;
    }

    logout() {
        localStorage.removeItem("token");
        this.isAuthenticated.next(false);
        this.router.navigate(["/login"]);
    }

    login(
        username: string,
        password: string
    ): Observable<AuthenticationResponse> {
        const request = new AuthenticationRequest();
        request.username = username;
        request.password = password;
        const headers = new HttpHeaders({
            "Content-type": "application/json",
            Accept: "application/json"
        });
        return this.http
            .post<AuthenticationResponse>(
                `${environment.api}/auth/`,
                JSON.stringify(request),
                { headers }
            )
            .pipe(
                map(e => {
                    Object.keys(e).forEach(key =>
                        localStorage.setItem(key, e[key])
                    );
                    this.isAuthenticated.next(true);
                    return e;
                })
            );
    }
    getLoggedUserData(): Observable<any> {
        const url = `${environment.api}/session/dados-usuario`;

        return this.http.get<any>(url, {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Accept: "application/json"
            })
        });
    }
}
