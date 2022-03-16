import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HomeComponent} from "./home.component";
import {HomeService} from "./home.service";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {TooltipModule} from "primeng/tooltip";
import {DialogModule} from "primeng/dialog";
import {MatButtonModule} from "@angular/material/button";
import {TableModule} from "primeng/table";
import {RouterModule} from "@angular/router";
import {MatTableModule} from "@angular/material/table";

@NgModule({
    imports: [
        CommonModule,
        TooltipModule,
        DialogModule,
        CalendarModule,
        FormsModule,
        MatButtonModule,
        TableModule,
        RouterModule,
        MatTableModule,
    ],
    declarations: [
        HomeComponent
    ],
    exports: [
        HomeComponent
    ],
    providers: [
        HomeService
    ]
})
export class HomeModule {

}
