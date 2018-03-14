import { BaseEntity } from './../../shared';

export class Place implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public productId?: number,
        public warehouseId?: number,
    ) {
    }
}
