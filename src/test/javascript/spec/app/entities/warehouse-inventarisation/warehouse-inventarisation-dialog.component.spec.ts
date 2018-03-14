/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InwentaryzacjaTestModule } from '../../../test.module';
import { WarehouseInventarisationDialogComponent } from '../../../../../../main/webapp/app/entities/warehouse-inventarisation/warehouse-inventarisation-dialog.component';
import { WarehouseInventarisationService } from '../../../../../../main/webapp/app/entities/warehouse-inventarisation/warehouse-inventarisation.service';
import { WarehouseInventarisation } from '../../../../../../main/webapp/app/entities/warehouse-inventarisation/warehouse-inventarisation.model';
import { ProductQuantityService } from '../../../../../../main/webapp/app/entities/product-quantity';

describe('Component Tests', () => {

    describe('WarehouseInventarisation Management Dialog Component', () => {
        let comp: WarehouseInventarisationDialogComponent;
        let fixture: ComponentFixture<WarehouseInventarisationDialogComponent>;
        let service: WarehouseInventarisationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InwentaryzacjaTestModule],
                declarations: [WarehouseInventarisationDialogComponent],
                providers: [
                    ProductQuantityService,
                    WarehouseInventarisationService
                ]
            })
            .overrideTemplate(WarehouseInventarisationDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WarehouseInventarisationDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WarehouseInventarisationService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new WarehouseInventarisation(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.warehouseInventarisation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'warehouseInventarisationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new WarehouseInventarisation();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.warehouseInventarisation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'warehouseInventarisationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
