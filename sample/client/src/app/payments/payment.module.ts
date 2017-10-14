import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MakePaymentComponent } from './make-payment/make-payment.component';
import { PaymentService } from './services/payment.service';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MakePaymentComponent
  ],
  providers:[
    PaymentService
  ],
  exports: [MakePaymentComponent]
  
})
export class PaymentModule { }
