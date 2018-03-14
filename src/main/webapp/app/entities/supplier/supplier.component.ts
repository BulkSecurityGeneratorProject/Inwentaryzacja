import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Supplier } from './supplier.model';
import { SupplierService } from './supplier.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-supplier',
    templateUrl: './supplier.component.html'
})
export class SupplierComponent implements OnInit, OnDestroy {
suppliers: Supplier[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private supplierService: SupplierService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.supplierService.query().subscribe(
            (res: HttpResponse<Supplier[]>) => {
                this.suppliers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSuppliers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Supplier) {
        return item.id;
    }
    registerChangeInSuppliers() {
        this.eventSubscriber = this.eventManager.subscribe('supplierListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
