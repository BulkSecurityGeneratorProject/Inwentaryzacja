import { BaseEntity } from './../../shared';

export const enum Unit {
    'PIECES',
    'KILOGRAM',
    'LITER'
}

export class Product implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public unit?: Unit,
        public places?: BaseEntity[],
        public suppliers?: BaseEntity[],
        public warehouses?: BaseEntity[],
        public productQuantityId?: number,
    ) {
    }
}
