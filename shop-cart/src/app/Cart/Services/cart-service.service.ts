import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  cartItemCount = new BehaviorSubject<number>(0);
  cartItemAmount = new BehaviorSubject<number>(0);
  TotalCartAmt: number = 0;
  TotalCartItem: number = 0;

  scope: [] = [];

  private UserBillingDetails = new BehaviorSubject<any>('service');
  currentBillingInfo = this.UserBillingDetails.asObservable();

  setCartItemCount() {
    this.TotalCartAmt = 0;
    this.TotalCartItem = 0;

    const currentArray = JSON.parse(localStorage.getItem('cartItem') || '{}');

    if (currentArray.length != undefined) {
      for (let i = 0; i < currentArray.length; ++i) {
        this.TotalCartAmt += currentArray[i].Qty * currentArray[i].price;
      }
      this.TotalCartItem = currentArray.length;
    }

    this.cartItemCount.next(this.TotalCartItem);
    this.cartItemAmount.next(this.TotalCartAmt);
  }

  constructor() {
    this.setCartItemCount();
  }

  /* for Order Details */
  //UserBillingDetails = new Subject<any>();

  


  UpdateBillingDetails(BillingDetails: any) {
    this.UserBillingDetails.next(BillingDetails);
  }
}
