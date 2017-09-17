import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Product } from '../../models/Product';
import { Action, ActionReducer } from '@ngrx/store';
import { ActionTypes } from '../cart.store';
import { CartStore } from '../../store/cart.store';
// import { ShoppingCart } from '../../models/shopping-cart';
// import { ShopItem } from '../../models/shop-item';

// import { CartComponent } from '../../components/cart/cart.component';

export interface State {
  // order: Array<Orders>;
  products: Array<Product>;
}

const initialState: State = {
  products: []
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART: {
      
      let quantity = 0;
      // Array of matching products
      let index = state.products.findIndex((product) => product.id === action.payload.product.id);
      
      console.log("index: ", index);
      let addProduct = Object.assign( {}, state, action.payload.product);
      if (index >= 0) {
        quantity = state.products[index].quantity;
        console.log("QTY: ", quantity);
        addProduct.quantity = action.payload.quantity + quantity;
        addProduct.unitPrice = addProduct.price;
        addProduct.subTotalPrice = (parseFloat(addProduct.unitPrice) * parseInt(addProduct.quantity)).toFixed(2);
        console.log("ADD PROD: ", addProduct);
        return {
          ...state,
          products : [
            ...state.products.slice(0, index),
            ...state.products.slice(index + 1),
            addProduct
          ]
        }
      }else{
        addProduct.quantity = action.payload.quantity,
        console.log("QTY: ",  addProduct.quantity);
        addProduct.subTotalPrice = (parseFloat(addProduct.unitPrice) * parseInt(addProduct.quantity)).toFixed(2);
        console.log("add product: ", addProduct );
        return {
          ...state,
          products: [
            ...state.products,
            addProduct  
          ]
        }
      }
    }
      
    
    case ActionTypes.REMOVE_FROM_CART: {
      
      //  return a new array excluding the product that needs to be removed
      let index = state.products.findIndex((product) => product.id === action.payload.id) 
        return {
          ...state,
          products: [
            ...state.products.slice(0, index),
            ...state.products.slice(index + 1)  
          ]
        }
      
      
      // following returns a new array by removing all items with the selected product id:
      // return { ...state, products: [...state.products.filter((product) => product.id !== action.payload.id)]}
      
    
    
    }

    case ActionTypes.SEARCH: {
      // let index = state.products
    }


    case ActionTypes.UPDATE_CART: {

  //     //new approach
  //     return { state.products.map(product => {
  //         return product.id === action.payload.id ?
  //           Object.assign({}, product, action.payload) : product; });
  //   }
  // }

      console.log("update action: ", action);

      let quantity = 0;
      // Array of matching products
      let index = state.products.findIndex((product) => product.id === action.payload.item.id);
      console.log("index: ", index);

      let updatedProduct = Object.assign( {}, state, action.payload.item);
      console.log ("updated product: ", updatedProduct);

      updatedProduct.quantity = action.payload.quantity;
      updatedProduct.subTotalPrice = (parseFloat(updatedProduct.unitPrice) * parseInt(updatedProduct.quantity)).toFixed(2);
      return {
        ...state,
        products : [
          ...state.products.slice(0, index),
          updatedProduct,
          ...state.products.slice(index + 1)
        ]
      }

    }

    default:
      return state;
  }
}