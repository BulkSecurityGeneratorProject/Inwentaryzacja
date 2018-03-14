/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { InwentaryzacjaTestModule } from '../../../test.module';
import { WarehouseInventarisationDetailComponent } from '../../../../../../main/webapp/app/entities/warehouse-inventarisation/warehouse-inventarisation-detail.component';
import { WarehouseInventarisationService } from '../../../../../../main/webapp/app/entities/warehouse-inventarisation/warehouse-inventarisation.service';
import { WarehouseInventarisation } from '../../../../../../main/webapp/app/entities/warehouse-inventarisation/warehouse-inventarisation.model';

describe('Component Tests', () => {

    describe('WarehouseInventarisation Management Detail Component', () => {
        let comp: WarehouseInventarisationDetailComponent;
        let fixture: ComponentFixture<WarehouseInventarisationDetailComponent>;
        let service: WarehouseInventarisationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InwentaryzacjaTestModule],
                declarations: [WarehouseInventarisationDetailComponent],
                providers: [
                    WarehouseInventarisationService
                ]
            })
            .overrideTemplate(WarehouseInventarisationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WarehouseInventarisationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WarehouseInventarisationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new WarehouseInventarisation(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.warehouseInventarisation).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
