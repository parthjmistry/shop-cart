import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  cartItemCount = new BehaviorSubject<number>(0);
  cartItemAmount = new BehaviorSubject<number>(0);
  TotalCartAmt: number = 0;
  TotalCartItem: number = 0;

  scope: [] = [];

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

  getScope() {
    return this.scope;
  }

  setScope(scope: any){
      this.scope = scope;
  }
}
