import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { WarehouseInventarisation } from './warehouse-inventarisation.model';
import { WarehouseInventarisationPopupService } from './warehouse-inventarisation-popup.service';
import { WarehouseInventarisationService } from './warehouse-inventarisation.service';
import { ProductQuantity, ProductQuantityService } from '../product-quantity';

@Component({
    selector: 'jhi-warehouse-inventarisation-dialog',
    templateUrl: './warehouse-inventarisation-dialog.component.html'
})
export class WarehouseInventarisationDialogComponent implements OnInit {

    warehouseInventarisation: WarehouseInventarisation;
    isSaving: boolean;

    productquantities: ProductQuantity[];
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private warehouseInventarisationService: WarehouseInventarisationService,
        private productQuantityService: ProductQuantityService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.productQuantityService.query()
            .subscribe((res: HttpResponse<ProductQuantity[]>) => { this.productquantities = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.warehouseInventarisation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.warehouseInventarisationService.update(this.warehouseInventarisation));
        } else {
            this.subscribeToSaveResponse(
                this.warehouseInventarisationService.create(this.warehouseInventarisation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<WarehouseInventarisation>>) {
        result.subscribe((res: HttpResponse<WarehouseInventarisation>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: WarehouseInventarisation) {
        this.eventManager.broadcast({ name: 'warehouseInventarisationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProductQuantityById(index: number, item: ProductQuantity) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-warehouse-inventarisation-popup',
    template: ''
})
export class WarehouseInventarisationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private warehouseInventarisationPopupService: WarehouseInventarisationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.warehouseInventarisationPopupService
                    .open(WarehouseInventarisationDialogComponent as Component, params['id']);
            } else {
                this.warehouseInventarisationPopupService
                    .open(WarehouseInventarisationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
