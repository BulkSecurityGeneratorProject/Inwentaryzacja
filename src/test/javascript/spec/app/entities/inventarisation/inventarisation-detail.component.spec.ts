/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { InwentaryzacjaTestModule } from '../../../test.module';
import { InventarisationDetailComponent } from '../../../../../../main/webapp/app/entities/inventarisation/inventarisation-detail.component';
import { InventarisationService } from '../../../../../../main/webapp/app/entities/inventarisation/inventarisation.service';
import { Inventarisation } from '../../../../../../main/webapp/app/entities/inventarisation/inventarisation.model';

describe('Component Tests', () => {

    describe('Inventarisation Management Detail Component', () => {
        let comp: InventarisationDetailComponent;
        let fixture: ComponentFixture<InventarisationDetailComponent>;
        let service: InventarisationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InwentaryzacjaTestModule],
                declarations: [InventarisationDetailComponent],
                providers: [
                    InventarisationService
                ]
            })
            .overrideTemplate(InventarisationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InventarisationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InventarisationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Inventarisation(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.inventarisation).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
