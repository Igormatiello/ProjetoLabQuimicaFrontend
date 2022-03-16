import { Component } from "@angular/core";
import { ToastService } from "./shared/components/toast/toast.service";
import { LoginService } from './pages/login/login.service';

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
    providers: [ToastService]
})
export class AppComponent {
  title = "ChemistryControl";

  isAuthenticated = false;

  constructor(loginService: LoginService) {
    loginService.isAuthenticated.asObservable()
        .subscribe(e => this.isAuthenticated = e);
  }

}
