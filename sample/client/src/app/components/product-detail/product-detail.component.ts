import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FlashMessagesService} from 'angular2-flash-messages'
import { Lightbox, IAlbum } from 'angular2-lightbox';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CartStore } from '../../store/cart.store';
import { VariantStore } from '../../store/variant.store';


@Component({
    selector: 'app-product-detail',
    templateUrl: 'product-detail.component.html',
    styleUrls: ['product-detail.component.css']
})

export class ProductDetailComponent {
    product: any = {}; // removed datatype Product
    quantity: number;
    private albums: Array<any> = [];

    constructor(
        private productService:ProductService,
        private route:ActivatedRoute,
        private location:Location,
        private cartStore: CartStore,
        private flashMessage: FlashMessagesService,
        private lightbox: Lightbox,
        private variantStore: VariantStore
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

                        this.variantStore.setSelectedVariant(this.product);

                    }

                    else {
                        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 2000});
                    }
                });
        })
    }

    changeVariant(product) {
        this.variantStore.changeVariant(product);
    }

    open(): void {
    this.lightbox.open(this.albums, 0);
  }

    goBack() {
        this.location.back()
    }
}
