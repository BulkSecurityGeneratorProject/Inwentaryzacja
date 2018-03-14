import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Warehouse } from './warehouse.model';
import { WarehouseService } from './warehouse.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-warehouse',
    templateUrl: './warehouse.component.html'
})
export class WarehouseComponent implements OnInit, OnDestroy {
warehouses: Warehouse[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private warehouseService: WarehouseService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.warehouseService.query().subscribe(
            (res: HttpResponse<Warehouse[]>) => {
                this.warehouses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInWarehouses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Warehouse) {
        return item.id;
    }
    registerChangeInWarehouses() {
        this.eventSubscriber = this.eventManager.subscribe('warehouseListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
