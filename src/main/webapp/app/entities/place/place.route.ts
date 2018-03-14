import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PlaceComponent } from './place.component';
import { PlaceDetailComponent } from './place-detail.component';
import { PlacePopupComponent } from './place-dialog.component';
import { PlaceDeletePopupComponent } from './place-delete-dialog.component';

export const placeRoute: Routes = [
    {
        path: 'place',
        component: PlaceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Places'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'place/:id',
        component: PlaceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Places'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const placePopupRoute: Routes = [
    {
        path: 'place-new',
        component: PlacePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Places'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'place/:id/edit',
        component: PlacePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Places'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'place/:id/delete',
        component: PlaceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Places'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
