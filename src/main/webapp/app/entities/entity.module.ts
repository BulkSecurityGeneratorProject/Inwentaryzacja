import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { InwentaryzacjaProductModule } from './product/product.module';
import { InwentaryzacjaWarehouseModule } from './warehouse/warehouse.module';
import { InwentaryzacjaPlaceModule } from './place/place.module';
import { InwentaryzacjaProductQuantityModule } from './product-quantity/product-quantity.module';
import { InwentaryzacjaWarehouseInventarisationModule } from './warehouse-inventarisation/warehouse-inventarisation.module';
import { InwentaryzacjaInventarisationModule } from './inventarisation/inventarisation.module';
import { InwentaryzacjaSupplierModule } from './supplier/supplier.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        InwentaryzacjaProductModule,
        InwentaryzacjaWarehouseModule,
        InwentaryzacjaPlaceModule,
        InwentaryzacjaProductQuantityModule,
        InwentaryzacjaWarehouseInventarisationModule,
        InwentaryzacjaInventarisationModule,
        InwentaryzacjaSupplierModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InwentaryzacjaEntityModule {}
