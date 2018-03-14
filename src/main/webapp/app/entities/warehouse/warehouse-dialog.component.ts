import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Warehouse } from './warehouse.model';
import { WarehousePopupService } from './warehouse-popup.service';
import { WarehouseService } from './warehouse.service';
import { Product, ProductService } from '../product';
import { WarehouseInventarisation, WarehouseInventarisationService } from '../warehouse-inventarisation';

@Component({
    selector: 'jhi-warehouse-dialog',
    templateUrl: './warehouse-dialog.component.html'
})
export class WarehouseDialogComponent implements OnInit {

    warehouse: Warehouse;
    isSaving: boolean;

    products: Product[];

    warehouseinventarisations: WarehouseInventarisation[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private warehouseService: WarehouseService,
        private productService: ProductService,
        private warehouseInventarisationService: WarehouseInventarisationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.productService.query()
            .subscribe((res: HttpResponse<Product[]>) => { this.products = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.warehouseInventarisationService.query()
            .subscribe((res: HttpResponse<WarehouseInventarisation[]>) => { this.warehouseinventarisations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.warehouse.id !== undefined) {
            this.subscribeToSaveResponse(
                this.warehouseService.update(this.warehouse));
        } else {
            this.subscribeToSaveResponse(
                this.warehouseService.create(this.warehouse));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Warehouse>>) {
        result.subscribe((res: HttpResponse<Warehouse>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Warehouse) {
        this.eventManager.broadcast({ name: 'warehouseListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }

    trackWarehouseInventarisationById(index: number, item: WarehouseInventarisation) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-warehouse-popup',
    template: ''
})
export class WarehousePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private warehousePopupService: WarehousePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.warehousePopupService
                    .open(WarehouseDialogComponent as Component, params['id']);
            } else {
                this.warehousePopupService
                    .open(WarehouseDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
