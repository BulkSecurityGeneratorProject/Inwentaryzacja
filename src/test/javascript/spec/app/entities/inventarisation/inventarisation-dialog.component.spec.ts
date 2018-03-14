/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InwentaryzacjaTestModule } from '../../../test.module';
import { InventarisationDialogComponent } from '../../../../../../main/webapp/app/entities/inventarisation/inventarisation-dialog.component';
import { InventarisationService } from '../../../../../../main/webapp/app/entities/inventarisation/inventarisation.service';
import { Inventarisation } from '../../../../../../main/webapp/app/entities/inventarisation/inventarisation.model';
import { WarehouseInventarisationService } from '../../../../../../main/webapp/app/entities/warehouse-inventarisation';

describe('Component Tests', () => {

    describe('Inventarisation Management Dialog Component', () => {
        let comp: InventarisationDialogComponent;
        let fixture: ComponentFixture<InventarisationDialogComponent>;
        let service: InventarisationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InwentaryzacjaTestModule],
                declarations: [InventarisationDialogComponent],
                providers: [
                    WarehouseInventarisationService,
                    InventarisationService
                ]
            })
            .overrideTemplate(InventarisationDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InventarisationDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InventarisationService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Inventarisation(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.inventarisation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'inventarisationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Inventarisation();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.inventarisation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'inventarisationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
