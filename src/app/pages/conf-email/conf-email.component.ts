import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfEmailService} from "./conf-email.service";
import {Router} from "@angular/router";
import {ToastService} from "../../shared/components/toast/toast.service";

@Component({
    selector: 'app-conf-email',
    templateUrl: './conf-email.component.html',
    styleUrls: ['./conf-email.component.css']
})
export class ConfEmailComponent implements OnInit {

    form: FormGroup;
    showSpinner = false;

    constructor(private confEmailService: ConfEmailService,
                private toastService: ToastService,
                private router: Router) {
        this.form = new FormBuilder().group({
            id: [""],
            host: ["", Validators.required],
            porta: ["", Validators.required],
            remetente: ["", Validators.required],
            usuario: ["", Validators.required],
            senha: ["", Validators.required],
            emailRecebimento: ["", Validators.compose([Validators.required, Validators.email])]
        });
    }

    ngOnInit() {
        this.findConfigEmail();
    }

    findConfigEmail() {
        this.confEmailService.findConf()
            .subscribe(e => {
                if (e != null) {
                    this.form.patchValue(e);
                }
            });
    }

    cancel() {
        this.router.navigate(['/']);
    }

    save() {
        if (this.form.valid) {
            const confEmail = this.form.getRawValue();
            this.confEmailService.save(confEmail)
                .subscribe(e => {
                    this.form.patchValue(e);
                    this.toastService.showSuccess(
                        "Sucesso",
                        "Registro salvo com sucesso!"
                    );
                }, error => {
                    this.toastService.showError(
                        "Atenção",
                        "Não foi possível concluir a ação"
                    );
                });
        }
    }

    testeEmail() {
        this.showSpinner = true;
        this.confEmailService.testeEnvio()
            .subscribe(e => {
                this.showSpinner = false;
                this.toastService.showSuccess(
                    "Sucesso",
                    "Email de teste enviado com sucesso!"
                );
            }, error => {
                this.showSpinner = false;
                this.toastService.showError(
                    "Atenção",
                    "Não foi possível concluir a ação"
                );
            });
    }
}
