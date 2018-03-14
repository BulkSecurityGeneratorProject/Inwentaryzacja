import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProductQuantity } from './product-quantity.model';
import { ProductQuantityPopupService } from './product-quantity-popup.service';
import { ProductQuantityService } from './product-quantity.service';

@Component({
    selector: 'jhi-product-quantity-delete-dialog',
    templateUrl: './product-quantity-delete-dialog.component.html'
})
export class ProductQuantityDeleteDialogComponent {

    productQuantity: ProductQuantity;

    constructor(
        private productQuantityService: ProductQuantityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productQuantityService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'productQuantityListModification',
                content: 'Deleted an productQuantity'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-quantity-delete-popup',
    template: ''
})
export class ProductQuantityDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productQuantityPopupService: ProductQuantityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.productQuantityPopupService
                .open(ProductQuantityDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
