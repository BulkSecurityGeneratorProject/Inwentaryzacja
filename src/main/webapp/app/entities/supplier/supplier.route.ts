import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SupplierComponent } from './supplier.component';
import { SupplierDetailComponent } from './supplier-detail.component';
import { SupplierPopupComponent } from './supplier-dialog.component';
import { SupplierDeletePopupComponent } from './supplier-delete-dialog.component';

export const supplierRoute: Routes = [
    {
        path: 'supplier',
        component: SupplierComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Suppliers'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'supplier/:id',
        component: SupplierDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Suppliers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const supplierPopupRoute: Routes = [
    {
        path: 'supplier-new',
        component: SupplierPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Suppliers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'supplier/:id/edit',
        component: SupplierPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Suppliers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'supplier/:id/delete',
        component: SupplierDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Suppliers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
