import { BaseEntity } from './../../shared';

export class Inventarisation implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public warehouseInventarisationId?: number,
    ) {
    }
}
