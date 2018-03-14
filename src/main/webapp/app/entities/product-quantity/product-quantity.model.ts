import { BaseEntity } from './../../shared';

export class ProductQuantity implements BaseEntity {
    constructor(
        public id?: number,
        public quantity?: number,
        public products?: BaseEntity[],
        public warehouseInventarisations?: BaseEntity[],
    ) {
    }
}
