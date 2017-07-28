import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FlashMessagesService} from 'angular2-flash-messages'
// import { Lightbox, IAlbum } from 'angular2-lightbox';

import { Product } from '../../models/product'; // currently unused
import { ProductService } from '../../services/product.service';
import { CartStore } from '../../store/cart.store';
import { VariantUtils } from '../../lib/variant-utils';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  products: Product[];
  quantity: number[];
  // private albums: Array<any> = [];

  constructor (private productService: ProductService,
               private router: Router, 
               private cartStore: CartStore,
               private flashMessage: FlashMessagesService,
               private variantUtils: VariantUtils
              //  private lightbox: Lightbox
              ) { }
  
  clickedProduct(product) {
      this.router.navigate(['/product-detail', product.id]);
  }


  addToCart(product) {
    // Copy prevents TypeError when changing product variant
    let productCopy = JSON.parse(JSON.stringify(product));
    this.cartStore.addToCart(productCopy, this.quantity || 1)
  }

  getProductData() {    
    //   // this is to load data from a file: 
    //  this.productService.getProducts().then(products => this.products = products);
      // this is to load data from server 
      this.productService.getProductsFromServer().subscribe(data => {
        console.log("Product DATA from server: ", data);
        if (data.success){
          // this.flashMessage.show(data.msg, {cssClass: 'alert-info', timeout: 2000});
          this.products = data.product;

          this.products.forEach(product => {
            this.variantUtils.setSelectedVariant(product);
          });

          console.log("All products: ", this.products);
          // for (let i = 0; i < data.products.length; i++) {
          //   const src = data.products[i]['src'];
          //   const caption = data.products[i]['name'];
          //   const thumb = data.products[i]['thumb'];
          //   const album = {
          //     src: src,
          //     caption: caption,
          //     thumb: thumb
          //   };
          //   this.albums.push(album);
          // }
          // console.log("albums: ", this.albums);
        }else{
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 2000});
        }
        
      })
  }

  changeVariant(product) {
    this.variantUtils.changeVariant(product);
   }

  // open(i): void {
  //   // open lightbox 
  //   this.lightbox.open(this.albums, i);
  // }

  ngOnInit() {
    // Get initial data from productService to display on the page
    this.getProductData();
  }

}
