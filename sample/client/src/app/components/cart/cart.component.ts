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
    let itemsToRemove = this.cart.filter(item => {
      if (product.selectedVariant && item.selectedVariant) {
        return item.selectedVariant.id === product.selectedVariant.id;
      }

      else {
        return item.id === product.id;
      }
    });

    console.log('Items to remove:\n');
    console.log(itemsToRemove);

    itemsToRemove.forEach(item => {
      this.cartStore.removeFromCart(item);

      let lineToRemove = this.lineItems.findIndex(line => {
        if (line.selectedVariant && item.selectedVariant) {
          return line.selectedVariant.id === item.selectedVariant.id;
        }

        else {
          return line.id === item.id;
        }
      })
      this.lineItems.splice(lineToRemove);
    });
  }

  variants(cart) {
    return cart.filter(item =>
      item.selectedVariant).length;
  }

  getLineItems() {
    let cartCopy = JSON.parse(JSON.stringify(this.cart)); // deep copy

    cartCopy.forEach(item => {
      if (this.lineItems.length > 0) {

        let productHasVariants = item.selectedVariant;
        let matchingProducts = this.lineItems.filter(line => {
          return line.id === item.id;
        });
        let productsMatch = matchingProducts.length > 0;
        let matchingVariants = this.lineItems.filter(line => {
          return line.id === item.id && line.selectedVariant && line.selectedVariant.id === item.selectedVariant.id;
        });
        let variantsMatch = matchingVariants.length > 0;

        if (!productHasVariants && productsMatch) {
          matchingProducts[0].quantity += item.quantity;
        }
        else if (productHasVariants && variantsMatch) {
          matchingVariants[0].quantity += item.quantity;
        }
        else {
          this.lineItems.push(item);
        }

      }
      else {
        this.lineItems.push(item);
      }
    });

    console.log('Line items:\n');
    console.log(this.lineItems);
    console.log('Cart:\n');
    console.log(this.cart);
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