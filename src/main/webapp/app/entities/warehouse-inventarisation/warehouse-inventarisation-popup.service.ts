import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { WarehouseInventarisation } from './warehouse-inventarisation.model';
import { WarehouseInventarisationService } from './warehouse-inventarisation.service';

@Injectable()
export class WarehouseInventarisationPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private warehouseInventarisationService: WarehouseInventarisationService

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
                this.warehouseInventarisationService.find(id)
                    .subscribe((warehouseInventarisationResponse: HttpResponse<WarehouseInventarisation>) => {
                        const warehouseInventarisation: WarehouseInventarisation = warehouseInventarisationResponse.body;
                        if (warehouseInventarisation.date) {
                            warehouseInventarisation.date = {
                                year: warehouseInventarisation.date.getFullYear(),
                                month: warehouseInventarisation.date.getMonth() + 1,
                                day: warehouseInventarisation.date.getDate()
                            };
                        }
                        this.ngbModalRef = this.warehouseInventarisationModalRef(component, warehouseInventarisation);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.warehouseInventarisationModalRef(component, new WarehouseInventarisation());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    warehouseInventarisationModalRef(component: Component, warehouseInventarisation: WarehouseInventarisation): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.warehouseInventarisation = warehouseInventarisation;
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
