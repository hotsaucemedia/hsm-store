import { User } from './user';
import { Address } from './address';
import { ShoppingCart } from './shopping-cart';


export class Order {
    id?: number;
    user_id?: number;
    created_at?: Date;
    shoppingCart?: ShoppingCart[];
   
    shipping_firstname : string= '';
    shipping_lastname : string= '';
    shipping_streetNumber : string = '';
    shipping_street : string = '';
    shipping_city : string= '';
    shipping_province : string= '';
    shipping_zipcode : string= '';
    shipping_country : string= '';
    
    billing_firstname? : string;
    billing_lastname? : string;
    billing_streetNumber? : string;
    billing_street? : string;
    billing_city? : string;
    billing_province? : string;
    billing_zipcode? : string;
    billing_country? : string;
}
