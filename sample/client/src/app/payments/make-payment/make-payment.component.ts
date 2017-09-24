import { Component, OnInit, HostListener } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit {

  handler: any;
  amount = 100;

  constructor(private paymentService: PaymentService ) { }

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
    this.handler.open({
      name: 'HSM online payment',
      description: 'Deposit to Account',
      amount: this.amount
    });
  }
  @HostListener('window:popstate')
    onPopstate() {
      this.handler.close()
    }
}