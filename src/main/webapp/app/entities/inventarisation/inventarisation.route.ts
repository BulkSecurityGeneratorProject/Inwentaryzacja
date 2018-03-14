import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { InventarisationComponent } from './inventarisation.component';
import { InventarisationDetailComponent } from './inventarisation-detail.component';
import { InventarisationPopupComponent } from './inventarisation-dialog.component';
import { InventarisationDeletePopupComponent } from './inventarisation-delete-dialog.component';

export const inventarisationRoute: Routes = [
    {
        path: 'inventarisation',
        component: InventarisationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Inventarisations'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'inventarisation/:id',
        component: InventarisationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Inventarisations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const inventarisationPopupRoute: Routes = [
    {
        path: 'inventarisation-new',
        component: InventarisationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Inventarisations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'inventarisation/:id/edit',
        component: InventarisationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Inventarisations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'inventarisation/:id/delete',
        component: InventarisationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Inventarisations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
