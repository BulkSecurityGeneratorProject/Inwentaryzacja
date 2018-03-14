import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Inventarisation } from './inventarisation.model';
import { InventarisationPopupService } from './inventarisation-popup.service';
import { InventarisationService } from './inventarisation.service';

@Component({
    selector: 'jhi-inventarisation-delete-dialog',
    templateUrl: './inventarisation-delete-dialog.component.html'
})
export class InventarisationDeleteDialogComponent {

    inventarisation: Inventarisation;

    constructor(
        private inventarisationService: InventarisationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.inventarisationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'inventarisationListModification',
                content: 'Deleted an inventarisation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-inventarisation-delete-popup',
    template: ''
})
export class InventarisationDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private inventarisationPopupService: InventarisationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.inventarisationPopupService
                .open(InventarisationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
