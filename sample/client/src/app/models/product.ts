import { Variant } from './variant';


export type ProductTheme = 'blue' | 'green' | 'gray';

export class Product {
    id?: number;
    name?: string;
    unitPrice?: number;
    desc?: string;
    src?: string;
    thumb?: string;
    variants?: Variant[]; 
    selectedVariant?: Variant;
    quantity?: number;
    discount? : number;
    subTotalPrice? : number;
}
