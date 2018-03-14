/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InwentaryzacjaTestModule } from '../../../test.module';
import { PlaceDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/place/place-delete-dialog.component';
import { PlaceService } from '../../../../../../main/webapp/app/entities/place/place.service';

describe('Component Tests', () => {

    describe('Place Management Delete Component', () => {
        let comp: PlaceDeleteDialogComponent;
        let fixture: ComponentFixture<PlaceDeleteDialogComponent>;
        let service: PlaceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InwentaryzacjaTestModule],
                declarations: [PlaceDeleteDialogComponent],
                providers: [
                    PlaceService
                ]
            })
            .overrideTemplate(PlaceDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PlaceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlaceService);
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
