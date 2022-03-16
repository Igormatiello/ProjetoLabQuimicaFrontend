import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenubarModule} from 'primeng/menubar';
import {MenuComponent} from './menu.component';
import {PanelMenuModule} from 'primeng/panelmenu';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        MenuComponent
    ],
    imports: [
        CommonModule,
        MenubarModule,
        PanelMenuModule,
        ButtonModule,
        ButtonModule,
        InputTextModule,
        FormsModule
    ],
    exports: [
        MenuComponent
    ]
})
export class MenuModule {
}
