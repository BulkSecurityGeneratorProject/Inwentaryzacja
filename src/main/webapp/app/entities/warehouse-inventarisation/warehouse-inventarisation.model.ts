import { BaseEntity } from './../../shared';

export class WarehouseInventarisation implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public warehouses?: BaseEntity[],
        public inventarisations?: BaseEntity[],
        public productQuantityId?: number,
    ) {
    }
}
