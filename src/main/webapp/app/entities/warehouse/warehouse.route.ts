import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { WarehouseComponent } from './warehouse.component';
import { WarehouseDetailComponent } from './warehouse-detail.component';
import { WarehousePopupComponent } from './warehouse-dialog.component';
import { WarehouseDeletePopupComponent } from './warehouse-delete-dialog.component';

export const warehouseRoute: Routes = [
    {
        path: 'warehouse',
        component: WarehouseComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Warehouses'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'warehouse/:id',
        component: WarehouseDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Warehouses'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const warehousePopupRoute: Routes = [
    {
        path: 'warehouse-new',
        component: WarehousePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Warehouses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'warehouse/:id/edit',
        component: WarehousePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Warehouses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'warehouse/:id/delete',
        component: WarehouseDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Warehouses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
