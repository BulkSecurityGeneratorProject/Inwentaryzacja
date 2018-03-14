/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { InwentaryzacjaTestModule } from '../../../test.module';
import { PlaceDetailComponent } from '../../../../../../main/webapp/app/entities/place/place-detail.component';
import { PlaceService } from '../../../../../../main/webapp/app/entities/place/place.service';
import { Place } from '../../../../../../main/webapp/app/entities/place/place.model';

describe('Component Tests', () => {

    describe('Place Management Detail Component', () => {
        let comp: PlaceDetailComponent;
        let fixture: ComponentFixture<PlaceDetailComponent>;
        let service: PlaceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InwentaryzacjaTestModule],
                declarations: [PlaceDetailComponent],
                providers: [
                    PlaceService
                ]
            })
            .overrideTemplate(PlaceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PlaceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlaceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Place(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.place).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
