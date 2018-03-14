import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InwentaryzacjaSharedModule } from '../../shared';
import {
    WarehouseInventarisationService,
    WarehouseInventarisationPopupService,
    WarehouseInventarisationComponent,
    WarehouseInventarisationDetailComponent,
    WarehouseInventarisationDialogComponent,
    WarehouseInventarisationPopupComponent,
    WarehouseInventarisationDeletePopupComponent,
    WarehouseInventarisationDeleteDialogComponent,
    warehouseInventarisationRoute,
    warehouseInventarisationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...warehouseInventarisationRoute,
    ...warehouseInventarisationPopupRoute,
];

@NgModule({
    imports: [
        InwentaryzacjaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        WarehouseInventarisationComponent,
        WarehouseInventarisationDetailComponent,
        WarehouseInventarisationDialogComponent,
        WarehouseInventarisationDeleteDialogComponent,
        WarehouseInventarisationPopupComponent,
        WarehouseInventarisationDeletePopupComponent,
    ],
    entryComponents: [
        WarehouseInventarisationComponent,
        WarehouseInventarisationDialogComponent,
        WarehouseInventarisationPopupComponent,
        WarehouseInventarisationDeleteDialogComponent,
        WarehouseInventarisationDeletePopupComponent,
    ],
    providers: [
        WarehouseInventarisationService,
        WarehouseInventarisationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InwentaryzacjaWarehouseInventarisationModule {}
