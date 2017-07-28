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

  public cart = [];
  public lineItems = []; // in progress
  public totalPrice: number;
  public totalQuantity: number;
  public cartSubscription: Subscription;
  private cartEmpty: boolean;

  constructor(
          private productService: ProductService,
          private cartStore: CartStore,
          private userService: UserService
      ) {
      }

  removeProduct(product) {
    this.cartStore.removeFromCart(product)
  }

  variants(cart) {
    return cart.filter(item =>
      item.selectedVariant).length;
  }

  // In progress
  getLineItems() {
    let cartCopy = JSON.parse(JSON.stringify(this.cart)); // deep copy

    // Only one loop necessary?
    cartCopy.forEach(item => {
      if (this.lineItems.length > 0) {
        this.lineItems.forEach((line) => {
          let variants = item.selectedVariant && line.selectedVariant;

          // Logic flawed: debug
          if (
            !variants && item.id === line.id
              ||
            variants && item.id === line.id && item.selectedVariant.id === line.selectedVariant.id
          ) {
            line.quantity += item.quantity;
          }
          else {
            this.lineItems.push(item);
          }

        });
      }
      else {
        this.lineItems.push(item);
      }
    });

    console.log(this.lineItems);
  }

  getTotalPrice() {
    let totalCost: Array<number> = [];
    let quantity: Array<number> = [];
    let intPrice: number;
    let intQuantity: number;
    this.cart.forEach((item, i) => {
      intPrice = parseInt(item.selectedVariant ? item.selectedVariant.price : item.price);
      intQuantity = parseInt(item.quantity);
      totalCost.push(intPrice);
      quantity.push(intQuantity);
    })

    this.totalPrice = totalCost.reduce((acc, item) => {
      return acc += item
    }, 0)
    this.totalQuantity = quantity.reduce((acc, item) => {
      return acc += item
    }, 0)
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
      this.getLineItems();
      this.getTotalPrice();
    });
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