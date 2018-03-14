import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Inventarisation } from './inventarisation.model';
import { InventarisationService } from './inventarisation.service';

@Component({
    selector: 'jhi-inventarisation-detail',
    templateUrl: './inventarisation-detail.component.html'
})
export class InventarisationDetailComponent implements OnInit, OnDestroy {

    inventarisation: Inventarisation;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private inventarisationService: InventarisationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInventarisations();
    }

    load(id) {
        this.inventarisationService.find(id)
            .subscribe((inventarisationResponse: HttpResponse<Inventarisation>) => {
                this.inventarisation = inventarisationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInventarisations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'inventarisationListModification',
            (response) => this.load(this.inventarisation.id)
        );
    }
}
