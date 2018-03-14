import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { WarehouseInventarisationComponent } from './warehouse-inventarisation.component';
import { WarehouseInventarisationDetailComponent } from './warehouse-inventarisation-detail.component';
import { WarehouseInventarisationPopupComponent } from './warehouse-inventarisation-dialog.component';
import { WarehouseInventarisationDeletePopupComponent } from './warehouse-inventarisation-delete-dialog.component';

export const warehouseInventarisationRoute: Routes = [
    {
        path: 'warehouse-inventarisation',
        component: WarehouseInventarisationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WarehouseInventarisations'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'warehouse-inventarisation/:id',
        component: WarehouseInventarisationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WarehouseInventarisations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const warehouseInventarisationPopupRoute: Routes = [
    {
        path: 'warehouse-inventarisation-new',
        component: WarehouseInventarisationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WarehouseInventarisations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'warehouse-inventarisation/:id/edit',
        component: WarehouseInventarisationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WarehouseInventarisations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'warehouse-inventarisation/:id/delete',
        component: WarehouseInventarisationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WarehouseInventarisations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
