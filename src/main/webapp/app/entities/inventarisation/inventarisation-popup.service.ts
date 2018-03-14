import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Inventarisation } from './inventarisation.model';
import { InventarisationService } from './inventarisation.service';

@Injectable()
export class InventarisationPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private inventarisationService: InventarisationService

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
                this.inventarisationService.find(id)
                    .subscribe((inventarisationResponse: HttpResponse<Inventarisation>) => {
                        const inventarisation: Inventarisation = inventarisationResponse.body;
                        if (inventarisation.date) {
                            inventarisation.date = {
                                year: inventarisation.date.getFullYear(),
                                month: inventarisation.date.getMonth() + 1,
                                day: inventarisation.date.getDate()
                            };
                        }
                        this.ngbModalRef = this.inventarisationModalRef(component, inventarisation);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.inventarisationModalRef(component, new Inventarisation());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    inventarisationModalRef(component: Component, inventarisation: Inventarisation): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.inventarisation = inventarisation;
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
