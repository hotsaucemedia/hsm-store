import { Component, OnChanges } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { CartStore } from '../../store/cart.store';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../services/user.service';
import { MakePaymentComponent } from '../../payments/make-payment/make-payment.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [MakePaymentComponent],
})
export class CartComponent {

  private cart = [];
  public totalPrice: number;
  public totalQuantity: number;
  public cartSubscription: Subscription;
  public cartEmpty: boolean;  //private to pub
  public quantity: Array<number> = [];  //private to pub

  constructor(
          private productService: ProductService,
          private cartStore: CartStore,
          private location:Location,
          private router: Router,
          private userService: UserService,
          private makePayment: MakePaymentComponent
      ) {
      }

  removeProduct(product) {

    this.cartStore.removeFromCart(product)
    this.getTotalPrice();
  }

  getProductDetails(product) {
    this.router.navigate(['/products', product.id]);
}

  getTotalPrice() {
    let subTotalCost: Array<number> = [];
    let unitPrice: number=0;
    let intQuantity: number=0;
    this.totalQuantity = 0;
    this.quantity = [];
    this.cart.forEach((item, i) => {
      console.log("ITEM: ", item);
      unitPrice = parseFloat(item.unitPrice);
      intQuantity = parseInt(item.quantity);
      subTotalCost.push(unitPrice * intQuantity);
      this.quantity.push(intQuantity);
    })
    console.log("sub total costs: ", subTotalCost);
    console.log("quantities: ", this.quantity);
    
    
    this.totalPrice = subTotalCost.reduce((prev, cur) => {
      return (prev + cur)
    }, 0)
    this.totalPrice = Number((this.totalPrice).toFixed(2));

    console.log("TOTAL PRICE: ", this.totalPrice)
    this.totalQuantity = this.quantity.reduce((prev, cur) => {
      return prev + cur
    }, 0)
    console.log("TOTAL QTY: ", this.quantity)
    // this.cart['total'] = this.totalPrice
  }

  updateCart(product) {
    console.log("updatedProduct: ", product);
    let index = this.cart.findIndex((item) => item.id === product.id) 
    console.log("QTYs:", this.quantity[index]);
    this.cartStore.updateCart(product, this.quantity[index]);
    this.getTotalPrice();
  }


  // checkout() {
  //   if (this.userService.isLoggedIn()){
  //     // alert('Under construction!');
  //     // this.makePayment.handlePayment(this.totalPrice)
  //   }else{
  //     alert('You must login first!');
  //   }
  // }

  ngOnInit() {
    this.cartSubscription = this.cartStore.getState().subscribe(res => {
      this.cart = res.products;
      console.log("res.products: ", res.products)
    });
    this.getTotalPrice();
    if(this.cart.length>0){
      this.cartEmpty = false;
      
    }else{
      this.cartEmpty = true;
    }
    

  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

  goBack() {
    this.location.back()
}
  
}