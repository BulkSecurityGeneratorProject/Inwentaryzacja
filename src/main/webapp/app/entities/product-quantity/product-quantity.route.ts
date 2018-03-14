import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ProductQuantityComponent } from './product-quantity.component';
import { ProductQuantityDetailComponent } from './product-quantity-detail.component';
import { ProductQuantityPopupComponent } from './product-quantity-dialog.component';
import { ProductQuantityDeletePopupComponent } from './product-quantity-delete-dialog.component';

export const productQuantityRoute: Routes = [
    {
        path: 'product-quantity',
        component: ProductQuantityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductQuantities'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'product-quantity/:id',
        component: ProductQuantityDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductQuantities'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productQuantityPopupRoute: Routes = [
    {
        path: 'product-quantity-new',
        component: ProductQuantityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductQuantities'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-quantity/:id/edit',
        component: ProductQuantityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductQuantities'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-quantity/:id/delete',
        component: ProductQuantityDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductQuantities'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
