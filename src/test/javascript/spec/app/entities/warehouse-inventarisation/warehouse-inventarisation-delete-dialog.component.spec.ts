/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InwentaryzacjaTestModule } from '../../../test.module';
import { WarehouseInventarisationDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/warehouse-inventarisation/warehouse-inventarisation-delete-dialog.component';
import { WarehouseInventarisationService } from '../../../../../../main/webapp/app/entities/warehouse-inventarisation/warehouse-inventarisation.service';

describe('Component Tests', () => {

    describe('WarehouseInventarisation Management Delete Component', () => {
        let comp: WarehouseInventarisationDeleteDialogComponent;
        let fixture: ComponentFixture<WarehouseInventarisationDeleteDialogComponent>;
        let service: WarehouseInventarisationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InwentaryzacjaTestModule],
                declarations: [WarehouseInventarisationDeleteDialogComponent],
                providers: [
                    WarehouseInventarisationService
                ]
            })
            .overrideTemplate(WarehouseInventarisationDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WarehouseInventarisationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WarehouseInventarisationService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
