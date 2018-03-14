import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProductQuantity } from './product-quantity.model';
import { ProductQuantityService } from './product-quantity.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-product-quantity',
    templateUrl: './product-quantity.component.html'
})
export class ProductQuantityComponent implements OnInit, OnDestroy {
productQuantities: ProductQuantity[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private productQuantityService: ProductQuantityService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.productQuantityService.query().subscribe(
            (res: HttpResponse<ProductQuantity[]>) => {
                this.productQuantities = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInProductQuantities();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ProductQuantity) {
        return item.id;
    }
    registerChangeInProductQuantities() {
        this.eventSubscriber = this.eventManager.subscribe('productQuantityListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
