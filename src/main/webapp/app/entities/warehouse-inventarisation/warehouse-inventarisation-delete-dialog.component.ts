import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { WarehouseInventarisation } from './warehouse-inventarisation.model';
import { WarehouseInventarisationPopupService } from './warehouse-inventarisation-popup.service';
import { WarehouseInventarisationService } from './warehouse-inventarisation.service';

@Component({
    selector: 'jhi-warehouse-inventarisation-delete-dialog',
    templateUrl: './warehouse-inventarisation-delete-dialog.component.html'
})
export class WarehouseInventarisationDeleteDialogComponent {

    warehouseInventarisation: WarehouseInventarisation;

    constructor(
        private warehouseInventarisationService: WarehouseInventarisationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.warehouseInventarisationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'warehouseInventarisationListModification',
                content: 'Deleted an warehouseInventarisation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-warehouse-inventarisation-delete-popup',
    template: ''
})
export class WarehouseInventarisationDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private warehouseInventarisationPopupService: WarehouseInventarisationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.warehouseInventarisationPopupService
                .open(WarehouseInventarisationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
