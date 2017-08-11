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
    // Elements of cart array to be removed
    let itemsToRemove = this.cart.filter(item => {
      // Determine removed items by variant id ...
      if (product.selectedVariant && item.selectedVariant) {
        return item.selectedVariant.id === product.selectedVariant.id;
      }
      // ... or product id
      else {
        return item.id === product.id;
      }
    });

    // Debugging
    console.log('Items to remove:\n');
    console.log(itemsToRemove);

    // Remove items from cart (reducer method)
    itemsToRemove.forEach(item => {
      this.cartStore.removeFromCart(item);
    });

    // Remove entries from list of items displayed
    // (Separate from actual cart array)
    let lineToRemove = this.lineItems.findIndex(line => {
      // Removed based on variant id ...
      if (product.selectedVariant && line.selectedVariant) {
        return line.selectedVariant.id === product.selectedVariant.id;
      }
      // ... or product id
      else {
        return line.id === product.id;
      }
    });

    let removed = this.lineItems.splice(lineToRemove, 1);
    
    // Debugging 
    console.log('Removed:\n');
    console.log(removed);

  }

  variants(cart) {
    return cart.filter(item =>
      item.selectedVariant).length;
  }

  // Group multiple cart entries together with quantites > 1
  getLineItems() {
    let cartCopy = JSON.parse(JSON.stringify(this.cart)); // deep copy

    cartCopy.forEach(item => {
      // Already item(s) in cart
      if (this.lineItems.length > 0) {

        // Test if product ids match
        let matchingProducts = this.lineItems.filter(line => {
          return line.id === item.id;
        });
        let productsMatch = matchingProducts.length > 0;

        // Test if product has variants
        let productHasVariants = item.selectedVariant;
        // Test if variants match
        let matchingVariants = this.lineItems.filter(line => {
          return line.id === item.id && line.selectedVariant &&
              line.selectedVariant.id === item.selectedVariant.id;
        });
        let variantsMatch = matchingVariants.length > 0;

        // Group entries according to product or variant id
        if (!productHasVariants && productsMatch) {
          matchingProducts[0].quantity += item.quantity;
        }
        else if (productHasVariants && variantsMatch) {
          matchingVariants[0].quantity += item.quantity;
        }
        // No match: new entry
        else {
          this.lineItems.push(item);
        }

      }
      // First item in cart
      else {
        this.lineItems.push(item);
      }
    });

    // Debugging
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