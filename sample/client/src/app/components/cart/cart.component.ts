import { Component, OnChanges } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartStore } from '../../store/cart.store';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
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
          private userService: UserService
      ) {
      }

  removeProduct(product) {

    this.cartStore.removeFromCart(product)
    this.getTotalPrice();
  }

  getTotalPrice() {
    let subTotalCost: Array<number> = [];
    let intPrice: number=0;
    let intQuantity: number=0;
    this.totalQuantity = 0;
    this.quantity = [];
    this.cart.forEach((item, i) => {
      console.log("ITEM: ", item);
      intPrice = parseInt(item.unitPrice);
      intQuantity = parseInt(item.quantity);
      subTotalCost.push(intPrice * intQuantity);
      this.quantity.push(intQuantity);
    })
    console.log("sub total costs: ", subTotalCost);
    console.log("quantities: ", this.quantity);
    
    
    this.totalPrice = subTotalCost.reduce((prev, cur) => {
      return prev + cur
    }, 0)
    console.log("TOTAL PRICE: ", this.totalPrice)
    this.totalQuantity = this.quantity.reduce((prev, cur) => {
      return prev + cur
    }, 0)
    console.log("TOTAL QTY: ", this.quantity)
  }

  updateCart(product) {
    console.log("updatedProduct: ", product);
    let index = this.cart.findIndex((item) => item.id === product.id) 
    console.log("QTYs:", this.quantity[index]);
    this.cartStore.updateCart(product, this.quantity[index]);
    this.getTotalPrice();
  }


  checkout() {
    if (this.userService.isLoggedIn()){
      alert('Under construction!');
    }else{
      alert('You must login first!');
    }
    
  }

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
  
}