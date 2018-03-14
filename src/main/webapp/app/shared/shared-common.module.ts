import { NgModule, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/en';

import {
    InwentaryzacjaSharedLibsModule,
    JhiAlertComponent,
    JhiAlertErrorComponent
} from './';

@NgModule({
    imports: [
        InwentaryzacjaSharedLibsModule
    ],
    declarations: [
        JhiAlertComponent,
        JhiAlertErrorComponent
    ],
    providers: [
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'en'
        },
    ],
    exports: [
        InwentaryzacjaSharedLibsModule,
        JhiAlertComponent,
        JhiAlertErrorComponent
    ]
})
export class InwentaryzacjaSharedCommonModule {
    constructor() {
        registerLocaleData(locale);
    }
}
