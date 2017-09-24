import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';


@Injectable()
export class PaymentService {
  userId: any;

  constructor( private http: Http ) { }

  processPayment(stripeToken: any, amount: number) {
    
    let user = localStorage.getItem('user')
    console.log("USER from local storage: ", localStorage.getItem('user'))    
    if (user) this.userId =JSON.parse(user).id;
    let payment = {
      token: stripeToken.id,
      amount: amount,
      user_id : this.userId 
    };

    console.log('PAYMENT: ', payment)

    
    this.registerPayment(payment)
      .subscribe((data) => {
        console.log("Data back from server: ", data);
        if (data.success){
          console.log("data.msg")
        }else{
          console.log("data.msg")
        } 
    
      },
      (err)=> {
        console.log('got error: ', err);
      }
    );

    }

    


  
  registerPayment(payment){
    let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post('http://localhost:3000/payments', payment, {headers: headers})
			.map(res => res.json());
  }
}





