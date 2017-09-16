import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FlashMessagesService} from 'angular2-flash-messages'
import { Subscription } from 'rxjs/Subscription';


import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { CartStore } from '../../store/cart.store';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  public products: Product[];
  public quantity = Array();
  public counter = Array();
  private cartSubscription: Subscription;
  private cart = [];

  

  constructor (private productService:ProductService,
               private router:Router, 
               private cartStore: CartStore,
               private flashMessage: FlashMessagesService
              ) {
}
  
  clickedProduct(product) {
      this.router.navigate(['/products', product.id]);
  }


  addToCart(product) {
    console.log("product to add: ", product.id);
    console.log("this.quantity[",product.id,"]:  ", this.quantity[product.name]);
    
    this.counter[product.name] += 1; 
    this.cartStore.addToCart(product, this.quantity[product.name])
    this.loadCart();
  }

  getProductData() {    
    //   // this is to load data from a file: 
    //  this.productService.getProducts().then(products => this.products = products);
      // this is to load data from server

      this.productService.getProductsFromServer().subscribe(data => {
        console.log("Product DATA from server: ", data);
        if (data.success){
          // this.flashMessage.show(data.msg, {cssClass: 'alert-info', timeout: 2000});
          this.products = data.products.slice(0);

          data.products.forEach((element,i) => {
            this.quantity[element.name] = 1;
            this.products[i].unitPrice = element.price;          
          });

          console.log("all products: ", this.products);

        }else{
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 2000});
        }
        
      })
  }

 
  loadCart(){
  this.cartSubscription = this.cartStore.getState().subscribe(res => {
    this.cart = res.products;
  });
  this.cart.forEach((cartItem,i) => {
    this.counter[cartItem.name] = cartItem.quantity;
  });
  }


  ngOnInit() {
    // Get initial data from productService to display on the page
    this.getProductData();
    this.loadCart();
    // this.cart.forEach((cartItem,i) => {
    //   this.counter[cartItem.name] = cartItem.quantity;
    // });
  
    

  }

}
