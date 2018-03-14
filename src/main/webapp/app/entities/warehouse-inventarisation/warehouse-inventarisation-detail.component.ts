import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { WarehouseInventarisation } from './warehouse-inventarisation.model';
import { WarehouseInventarisationService } from './warehouse-inventarisation.service';

@Component({
    selector: 'jhi-warehouse-inventarisation-detail',
    templateUrl: './warehouse-inventarisation-detail.component.html'
})
export class WarehouseInventarisationDetailComponent implements OnInit, OnDestroy {

    warehouseInventarisation: WarehouseInventarisation;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private warehouseInventarisationService: WarehouseInventarisationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInWarehouseInventarisations();
    }

    load(id) {
        this.warehouseInventarisationService.find(id)
            .subscribe((warehouseInventarisationResponse: HttpResponse<WarehouseInventarisation>) => {
                this.warehouseInventarisation = warehouseInventarisationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInWarehouseInventarisations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'warehouseInventarisationListModification',
            (response) => this.load(this.warehouseInventarisation.id)
        );
    }
}
