import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Inventarisation } from './inventarisation.model';
import { InventarisationService } from './inventarisation.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-inventarisation',
    templateUrl: './inventarisation.component.html'
})
export class InventarisationComponent implements OnInit, OnDestroy {
inventarisations: Inventarisation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private inventarisationService: InventarisationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.inventarisationService.query().subscribe(
            (res: HttpResponse<Inventarisation[]>) => {
                this.inventarisations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInInventarisations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Inventarisation) {
        return item.id;
    }
    registerChangeInInventarisations() {
        this.eventSubscriber = this.eventManager.subscribe('inventarisationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
