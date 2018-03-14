/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { InwentaryzacjaTestModule } from '../../../test.module';
import { ProductQuantityDetailComponent } from '../../../../../../main/webapp/app/entities/product-quantity/product-quantity-detail.component';
import { ProductQuantityService } from '../../../../../../main/webapp/app/entities/product-quantity/product-quantity.service';
import { ProductQuantity } from '../../../../../../main/webapp/app/entities/product-quantity/product-quantity.model';

describe('Component Tests', () => {

    describe('ProductQuantity Management Detail Component', () => {
        let comp: ProductQuantityDetailComponent;
        let fixture: ComponentFixture<ProductQuantityDetailComponent>;
        let service: ProductQuantityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InwentaryzacjaTestModule],
                declarations: [ProductQuantityDetailComponent],
                providers: [
                    ProductQuantityService
                ]
            })
            .overrideTemplate(ProductQuantityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductQuantityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductQuantityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ProductQuantity(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.productQuantity).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
