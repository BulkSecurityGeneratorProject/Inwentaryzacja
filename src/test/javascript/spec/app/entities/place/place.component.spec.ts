/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { InwentaryzacjaTestModule } from '../../../test.module';
import { PlaceComponent } from '../../../../../../main/webapp/app/entities/place/place.component';
import { PlaceService } from '../../../../../../main/webapp/app/entities/place/place.service';
import { Place } from '../../../../../../main/webapp/app/entities/place/place.model';

describe('Component Tests', () => {

    describe('Place Management Component', () => {
        let comp: PlaceComponent;
        let fixture: ComponentFixture<PlaceComponent>;
        let service: PlaceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InwentaryzacjaTestModule],
                declarations: [PlaceComponent],
                providers: [
                    PlaceService
                ]
            })
            .overrideTemplate(PlaceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PlaceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlaceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Place(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.places[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
