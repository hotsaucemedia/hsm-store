import { Variant } from './variant';

export class Product {
    id?: number;
    name?: string;
    price?: number;
    desc?: string;
    image?: string;
    thumb?: string;
    variants?: Variant[]; 
    selectedVariant?: Variant;
}
