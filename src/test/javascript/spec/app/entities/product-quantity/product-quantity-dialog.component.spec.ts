/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InwentaryzacjaTestModule } from '../../../test.module';
import { ProductQuantityDialogComponent } from '../../../../../../main/webapp/app/entities/product-quantity/product-quantity-dialog.component';
import { ProductQuantityService } from '../../../../../../main/webapp/app/entities/product-quantity/product-quantity.service';
import { ProductQuantity } from '../../../../../../main/webapp/app/entities/product-quantity/product-quantity.model';

describe('Component Tests', () => {

    describe('ProductQuantity Management Dialog Component', () => {
        let comp: ProductQuantityDialogComponent;
        let fixture: ComponentFixture<ProductQuantityDialogComponent>;
        let service: ProductQuantityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InwentaryzacjaTestModule],
                declarations: [ProductQuantityDialogComponent],
                providers: [
                    ProductQuantityService
                ]
            })
            .overrideTemplate(ProductQuantityDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductQuantityDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductQuantityService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProductQuantity(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.productQuantity = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'productQuantityListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProductQuantity();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.productQuantity = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'productQuantityListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
