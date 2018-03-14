import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Place } from './place.model';
import { PlaceService } from './place.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-place',
    templateUrl: './place.component.html'
})
export class PlaceComponent implements OnInit, OnDestroy {
places: Place[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private placeService: PlaceService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.placeService.query().subscribe(
            (res: HttpResponse<Place[]>) => {
                this.places = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPlaces();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Place) {
        return item.id;
    }
    registerChangeInPlaces() {
        this.eventSubscriber = this.eventManager.subscribe('placeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
