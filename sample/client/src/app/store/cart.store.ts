import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { type } from './utils/type-cache';
import { Observable } from 'rxjs/Observable';

export const ActionTypes = {
  SEARCH:               type('[Cart] Search'),
  SEARCH_COMPLETE:      type('[Cart] Search Complete'),
  LOAD:                 type('[Cart] Load'),
  SELECT:               type('[Cart] Select'),
  ADD_TO_CART:          type('[Cart] Add'),
  REMOVE_FROM_CART:     type('[Cart] Remove'),
  UPDATE_CART:          type('[Cart] Update'),
  CLEAR:                type('[Cart] Clear')
};

@Injectable()
export class CartStore {
    state: any;
    constructor(private store: Store<any>) {
        this.state = this.getState();
    }

    getState(): Observable<any> {
        // this.store.subscribe( x => console.log("STORE:" , x));
        return this.store.select('cart');
        
    }

    addToCart(product, quantity) {
        this.store.dispatch({
            type: ActionTypes.ADD_TO_CART,
            payload: {
                product,
                quantity
            }
        })
    }

    removeFromCart(payload) {
        console.log('remove,', payload)
        this.store.dispatch({
            type: ActionTypes.REMOVE_FROM_CART,
            payload: payload
        })
    }

    updateCart(item, quantity){
        console.log('updating item:', item, "NEW QTY: ", quantity);
        this.store.dispatch({
            type: ActionTypes.UPDATE_CART,
            payload: {
                item,
                quantity
            }
        })
    }

}