import { BaseEntity } from './../../shared';

export class Warehouse implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public places?: BaseEntity[],
        public productId?: number,
        public warehouseInventarisationId?: number,
        public products?: BaseEntity[],
    ) {
    }
}
