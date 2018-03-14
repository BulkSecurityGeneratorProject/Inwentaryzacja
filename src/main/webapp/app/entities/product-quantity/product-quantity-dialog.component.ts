import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProductQuantity } from './product-quantity.model';
import { ProductQuantityPopupService } from './product-quantity-popup.service';
import { ProductQuantityService } from './product-quantity.service';

@Component({
    selector: 'jhi-product-quantity-dialog',
    templateUrl: './product-quantity-dialog.component.html'
})
export class ProductQuantityDialogComponent implements OnInit {

    productQuantity: ProductQuantity;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private productQuantityService: ProductQuantityService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.productQuantity.id !== undefined) {
            this.subscribeToSaveResponse(
                this.productQuantityService.update(this.productQuantity));
        } else {
            this.subscribeToSaveResponse(
                this.productQuantityService.create(this.productQuantity));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ProductQuantity>>) {
        result.subscribe((res: HttpResponse<ProductQuantity>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ProductQuantity) {
        this.eventManager.broadcast({ name: 'productQuantityListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-product-quantity-popup',
    template: ''
})
export class ProductQuantityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productQuantityPopupService: ProductQuantityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.productQuantityPopupService
                    .open(ProductQuantityDialogComponent as Component, params['id']);
            } else {
                this.productQuantityPopupService
                    .open(ProductQuantityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
