/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { InwentaryzacjaTestModule } from '../../../test.module';
import { ProductQuantityComponent } from '../../../../../../main/webapp/app/entities/product-quantity/product-quantity.component';
import { ProductQuantityService } from '../../../../../../main/webapp/app/entities/product-quantity/product-quantity.service';
import { ProductQuantity } from '../../../../../../main/webapp/app/entities/product-quantity/product-quantity.model';

describe('Component Tests', () => {

    describe('ProductQuantity Management Component', () => {
        let comp: ProductQuantityComponent;
        let fixture: ComponentFixture<ProductQuantityComponent>;
        let service: ProductQuantityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InwentaryzacjaTestModule],
                declarations: [ProductQuantityComponent],
                providers: [
                    ProductQuantityService
                ]
            })
            .overrideTemplate(ProductQuantityComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductQuantityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductQuantityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ProductQuantity(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.productQuantities[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
