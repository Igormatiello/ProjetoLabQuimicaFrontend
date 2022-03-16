import {NgModule} from "@angular/core";
import {ConfEmailComponent} from "./conf-email.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {FieldsetModule} from "primeng/fieldset";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@NgModule({
    declarations: [ConfEmailComponent],
    exports: [ConfEmailComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FieldsetModule,
        ProgressSpinnerModule
    ]
})
export class ConfEmailModule {

}
