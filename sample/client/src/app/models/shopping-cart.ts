import { Product } from './product';

export class ShoppingCart {
    id?: number;
    product? : Product[];
    totalQuantity?: number;
    totalSum?: number;

    constructor() {
        this.product = [];
        this.totalQuantity = 0;
        this.totalSum = 0;
    }

}
