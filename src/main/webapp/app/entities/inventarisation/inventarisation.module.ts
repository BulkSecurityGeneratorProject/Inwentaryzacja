import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InwentaryzacjaSharedModule } from '../../shared';
import {
    InventarisationService,
    InventarisationPopupService,
    InventarisationComponent,
    InventarisationDetailComponent,
    InventarisationDialogComponent,
    InventarisationPopupComponent,
    InventarisationDeletePopupComponent,
    InventarisationDeleteDialogComponent,
    inventarisationRoute,
    inventarisationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...inventarisationRoute,
    ...inventarisationPopupRoute,
];

@NgModule({
    imports: [
        InwentaryzacjaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        InventarisationComponent,
        InventarisationDetailComponent,
        InventarisationDialogComponent,
        InventarisationDeleteDialogComponent,
        InventarisationPopupComponent,
        InventarisationDeletePopupComponent,
    ],
    entryComponents: [
        InventarisationComponent,
        InventarisationDialogComponent,
        InventarisationPopupComponent,
        InventarisationDeleteDialogComponent,
        InventarisationDeletePopupComponent,
    ],
    providers: [
        InventarisationService,
        InventarisationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InwentaryzacjaInventarisationModule {}
