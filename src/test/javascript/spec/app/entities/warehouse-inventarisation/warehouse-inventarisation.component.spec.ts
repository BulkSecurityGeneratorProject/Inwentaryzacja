/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { InwentaryzacjaTestModule } from '../../../test.module';
import { WarehouseInventarisationComponent } from '../../../../../../main/webapp/app/entities/warehouse-inventarisation/warehouse-inventarisation.component';
import { WarehouseInventarisationService } from '../../../../../../main/webapp/app/entities/warehouse-inventarisation/warehouse-inventarisation.service';
import { WarehouseInventarisation } from '../../../../../../main/webapp/app/entities/warehouse-inventarisation/warehouse-inventarisation.model';

describe('Component Tests', () => {

    describe('WarehouseInventarisation Management Component', () => {
        let comp: WarehouseInventarisationComponent;
        let fixture: ComponentFixture<WarehouseInventarisationComponent>;
        let service: WarehouseInventarisationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InwentaryzacjaTestModule],
                declarations: [WarehouseInventarisationComponent],
                providers: [
                    WarehouseInventarisationService
                ]
            })
            .overrideTemplate(WarehouseInventarisationComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WarehouseInventarisationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WarehouseInventarisationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new WarehouseInventarisation(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.warehouseInventarisations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
