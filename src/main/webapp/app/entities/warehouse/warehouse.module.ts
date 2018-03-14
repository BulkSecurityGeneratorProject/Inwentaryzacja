import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InwentaryzacjaSharedModule } from '../../shared';
import {
    WarehouseService,
    WarehousePopupService,
    WarehouseComponent,
    WarehouseDetailComponent,
    WarehouseDialogComponent,
    WarehousePopupComponent,
    WarehouseDeletePopupComponent,
    WarehouseDeleteDialogComponent,
    warehouseRoute,
    warehousePopupRoute,
} from './';

const ENTITY_STATES = [
    ...warehouseRoute,
    ...warehousePopupRoute,
];

@NgModule({
    imports: [
        InwentaryzacjaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        WarehouseComponent,
        WarehouseDetailComponent,
        WarehouseDialogComponent,
        WarehouseDeleteDialogComponent,
        WarehousePopupComponent,
        WarehouseDeletePopupComponent,
    ],
    entryComponents: [
        WarehouseComponent,
        WarehouseDialogComponent,
        WarehousePopupComponent,
        WarehouseDeleteDialogComponent,
        WarehouseDeletePopupComponent,
    ],
    providers: [
        WarehouseService,
        WarehousePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InwentaryzacjaWarehouseModule {}
