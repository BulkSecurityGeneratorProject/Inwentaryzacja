import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InwentaryzacjaSharedModule } from '../../shared';
import {
    ProductQuantityService,
    ProductQuantityPopupService,
    ProductQuantityComponent,
    ProductQuantityDetailComponent,
    ProductQuantityDialogComponent,
    ProductQuantityPopupComponent,
    ProductQuantityDeletePopupComponent,
    ProductQuantityDeleteDialogComponent,
    productQuantityRoute,
    productQuantityPopupRoute,
} from './';

const ENTITY_STATES = [
    ...productQuantityRoute,
    ...productQuantityPopupRoute,
];

@NgModule({
    imports: [
        InwentaryzacjaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProductQuantityComponent,
        ProductQuantityDetailComponent,
        ProductQuantityDialogComponent,
        ProductQuantityDeleteDialogComponent,
        ProductQuantityPopupComponent,
        ProductQuantityDeletePopupComponent,
    ],
    entryComponents: [
        ProductQuantityComponent,
        ProductQuantityDialogComponent,
        ProductQuantityPopupComponent,
        ProductQuantityDeleteDialogComponent,
        ProductQuantityDeletePopupComponent,
    ],
    providers: [
        ProductQuantityService,
        ProductQuantityPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InwentaryzacjaProductQuantityModule {}
