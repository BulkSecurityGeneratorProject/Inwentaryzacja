import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ProductQuantity } from './product-quantity.model';
import { ProductQuantityService } from './product-quantity.service';

@Component({
    selector: 'jhi-product-quantity-detail',
    templateUrl: './product-quantity-detail.component.html'
})
export class ProductQuantityDetailComponent implements OnInit, OnDestroy {

    productQuantity: ProductQuantity;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private productQuantityService: ProductQuantityService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProductQuantities();
    }

    load(id) {
        this.productQuantityService.find(id)
            .subscribe((productQuantityResponse: HttpResponse<ProductQuantity>) => {
                this.productQuantity = productQuantityResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProductQuantities() {
        this.eventSubscriber = this.eventManager.subscribe(
            'productQuantityListModification',
            (response) => this.load(this.productQuantity.id)
        );
    }
}
