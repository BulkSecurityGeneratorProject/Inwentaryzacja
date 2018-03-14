import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { WarehouseInventarisation } from './warehouse-inventarisation.model';
import { WarehouseInventarisationService } from './warehouse-inventarisation.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-warehouse-inventarisation',
    templateUrl: './warehouse-inventarisation.component.html'
})
export class WarehouseInventarisationComponent implements OnInit, OnDestroy {
warehouseInventarisations: WarehouseInventarisation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private warehouseInventarisationService: WarehouseInventarisationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.warehouseInventarisationService.query().subscribe(
            (res: HttpResponse<WarehouseInventarisation[]>) => {
                this.warehouseInventarisations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInWarehouseInventarisations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: WarehouseInventarisation) {
        return item.id;
    }
    registerChangeInWarehouseInventarisations() {
        this.eventSubscriber = this.eventManager.subscribe('warehouseInventarisationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
