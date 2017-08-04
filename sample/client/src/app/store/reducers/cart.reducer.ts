import {Action} from '@ngrx/store';
import {ActionTypes} from '../cart.store';
import {Product} from '../../models/product';

export interface State {
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
      let index = state.products.findIndex(product => {
        return product.id = action.payload.product.id;
      });

      if (index >= 0) {
        quantity = JSON.parse(JSON.stringify(state.products[index].quantity)).parseInt();
        state.products.slice(0, index);
        state.products.slice(index + 1);
      }

      let addProduct = Object.assign({}, action.payload.product)
      addProduct.quantity = action.payload.quantity + quantity;
      addProduct.price = (parseInt(addProduct.price) * parseInt(addProduct.quantity)).toFixed(2)
      return {
        ...state,
        products: [
            ...state.products, 
            addProduct
            // action.payload
        ]
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
    }

    default:
      return state;
  }
}
