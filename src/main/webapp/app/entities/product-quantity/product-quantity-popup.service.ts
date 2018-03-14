import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ProductQuantity } from './product-quantity.model';
import { ProductQuantityService } from './product-quantity.service';

@Injectable()
export class ProductQuantityPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private productQuantityService: ProductQuantityService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.productQuantityService.find(id)
                    .subscribe((productQuantityResponse: HttpResponse<ProductQuantity>) => {
                        const productQuantity: ProductQuantity = productQuantityResponse.body;
                        this.ngbModalRef = this.productQuantityModalRef(component, productQuantity);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.productQuantityModalRef(component, new ProductQuantity());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    productQuantityModalRef(component: Component, productQuantity: ProductQuantity): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.productQuantity = productQuantity;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
