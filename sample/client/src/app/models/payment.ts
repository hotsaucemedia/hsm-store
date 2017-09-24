import { User } from './user';
import { ShoppingCart } from './shopping-cart';


export class Payment {
    id?: number;
    user_id?: number;
    amount?: number;
    token?: object;
    charge?: object;
    created_at?: Date;
    shoppingCart?: ShoppingCart[];
}
