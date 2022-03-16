import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ToastModule } from "primeng/toast";
import { AppReportComponent } from "./app-report.component";
import { TableModule } from "primeng/table";
import { NgxPrintModule } from 'ngx-print';

@NgModule({
    declarations: [AppReportComponent],
    imports: [CommonModule, TableModule, NgxPrintModule],
    exports: [AppReportComponent]
})
export class AppReportModule {}
