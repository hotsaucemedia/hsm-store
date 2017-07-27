import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FlashMessagesService} from 'angular2-flash-messages'
import { Lightbox, IAlbum } from 'angular2-lightbox';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CartStore } from '../../store/cart.store';

@Component({
    selector: 'app-product-detail',
    templateUrl: 'product-detail.component.html',
    styleUrls: ['product-detail.component.css']
})

export class ProductDetailComponent {
    product: any = {};
    quantity: number;
    private albums: Array<any> = [];

    constructor(
        private productService:ProductService,
        private route:ActivatedRoute,
        private location:Location,
        private cartStore: CartStore,
        private flashMessage: FlashMessagesService,
        private lightbox: Lightbox
    ) { }

    addToCart(product) {
        this.cartStore.addToCart(product, this.quantity || 1)
    }

    ngOnInit() {
        this.route.params.forEach(param => {
            let id = parseInt(param['id']);
            // // get data from file 
            // this.productService.getProduct(id)
            //     .then(product => this.product = product)
            this.productService.getProductFromServer(id)
                .subscribe(data => {
                    if (data){
                        this.product = data.product;
                        const album = {
                            image: data.product.image,
                            caption: data.product.name,
                            thumb: data.product.thumb
                        };
                        this.albums.push(album);

                        if (this.product.variants.length > 0) {
                          this.product.selectedVariant = this.product.variants[0].options[0];
                        }
                    }
                    else {
                        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 2000});
                    }
                    console.log(data);
                });
        })
    }

    // Copied from ProductsComponent
    // How to reuse the parent component?
    changeVariant(product): void {

        product.selectedVariant = product.variants
          .filter(function(variant) {
            return variant.name === (<HTMLInputElement>event.target).name;
          })[0].options
          .filter(function(option) {
           return option.name === (<HTMLInputElement>event.target).value;
         })[0];

    }

    open(): void {
    this.lightbox.open(this.albums, 0);
  }

    goBack() {
        this.location.back()
    }
}
