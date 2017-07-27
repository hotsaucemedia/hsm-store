import { Injectable } from '@angular/core';

@Injectable()
export class VariantStore {

  changeVariant(product): void {
    product.selectedVariant = product.variants
      .filter(function(variant) {
        return variant.name === (<HTMLInputElement>event.target).name;
      })[0].options
      .filter(function(option) {
        return option.name === (<HTMLInputElement>event.target).value;
       })[0];
    }

    setSelectedVariant(product): void {
      if (product.variants.length > 0) {
        product.selectedVariant = product.variants[0].options[0]; 
      }
    }

}