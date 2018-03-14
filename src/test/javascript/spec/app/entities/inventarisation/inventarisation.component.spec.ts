/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { InwentaryzacjaTestModule } from '../../../test.module';
import { InventarisationComponent } from '../../../../../../main/webapp/app/entities/inventarisation/inventarisation.component';
import { InventarisationService } from '../../../../../../main/webapp/app/entities/inventarisation/inventarisation.service';
import { Inventarisation } from '../../../../../../main/webapp/app/entities/inventarisation/inventarisation.model';

describe('Component Tests', () => {

    describe('Inventarisation Management Component', () => {
        let comp: InventarisationComponent;
        let fixture: ComponentFixture<InventarisationComponent>;
        let service: InventarisationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InwentaryzacjaTestModule],
                declarations: [InventarisationComponent],
                providers: [
                    InventarisationService
                ]
            })
            .overrideTemplate(InventarisationComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InventarisationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InventarisationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Inventarisation(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.inventarisations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
