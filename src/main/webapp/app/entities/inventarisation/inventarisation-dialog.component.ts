import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Inventarisation } from './inventarisation.model';
import { InventarisationPopupService } from './inventarisation-popup.service';
import { InventarisationService } from './inventarisation.service';
import { WarehouseInventarisation, WarehouseInventarisationService } from '../warehouse-inventarisation';

@Component({
    selector: 'jhi-inventarisation-dialog',
    templateUrl: './inventarisation-dialog.component.html'
})
export class InventarisationDialogComponent implements OnInit {

    inventarisation: Inventarisation;
    isSaving: boolean;

    warehouseinventarisations: WarehouseInventarisation[];
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private inventarisationService: InventarisationService,
        private warehouseInventarisationService: WarehouseInventarisationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.warehouseInventarisationService.query()
            .subscribe((res: HttpResponse<WarehouseInventarisation[]>) => { this.warehouseinventarisations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.inventarisation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.inventarisationService.update(this.inventarisation));
        } else {
            this.subscribeToSaveResponse(
                this.inventarisationService.create(this.inventarisation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Inventarisation>>) {
        result.subscribe((res: HttpResponse<Inventarisation>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Inventarisation) {
        this.eventManager.broadcast({ name: 'inventarisationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackWarehouseInventarisationById(index: number, item: WarehouseInventarisation) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-inventarisation-popup',
    template: ''
})
export class InventarisationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private inventarisationPopupService: InventarisationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.inventarisationPopupService
                    .open(InventarisationDialogComponent as Component, params['id']);
            } else {
                this.inventarisationPopupService
                    .open(InventarisationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
