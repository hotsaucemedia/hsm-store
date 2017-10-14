import { Component, OnInit, HostListener } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../services/user.service';
import { CartActions } from '../../store/actions/cart.actions';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit {

  handler: any;
  amount: number;

  constructor(private paymentService: PaymentService,
              private userService: UserService,
              private cartActions: CartActions
             ) { }

  ngOnInit() {
    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      image: '',
      locale: 'auto',
      token: token => {
        console.log("TOKEN from Stripe: ", token)
        this.paymentService.processPayment(token, this.amount)
      }
    });
  }
  handlePayment() {
    if (this.userService.isLoggedIn()){
      
      this.cartActions.getState().subscribe(res => {
        this.amount = res.total*100;
      });

      this.handler.open({
      name: 'HSM online payment',
      description: 'Deposit to Account',
      amount: this.amount
      });
    }else{
        alert('You must login first!');
      }
  }
  @HostListener('window:popstate')
    onPopstate() {
      this.handler.close()
    }
}