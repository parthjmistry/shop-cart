import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { CartModel } from '../Models/cart-model';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  cartItemCount = new BehaviorSubject<number>(0);
  cartItemAmount = new BehaviorSubject<number>(0);
  TotalCartAmt: number = 0;

  setCartItemCount() {
    this.TotalCartAmt = 0;

    const currentArray = JSON.parse(localStorage.getItem('cartItem') || '{}');

    for (let i = 0; i < currentArray.length; ++i) {
      this.TotalCartAmt += currentArray[i].Qty * currentArray[i].price;
    }

    this.cartItemCount.next(currentArray.length);
    this.cartItemAmount.next(this.TotalCartAmt);
  }

  constructor() {
    this.setCartItemCount();
  }

  private _Cart = new BehaviorSubject<CartModel[]>([]);
  readonly Products$ = this._Cart.asObservable();

  private Products: CartModel[] = [];
  private nextId = 0;

  GetCartItems() {
    this._Cart.next(this.Products);
  }

  AddItemToCart(item: CartModel) {
    debugger;
    let newId = ++this.nextId;
    console.log(newId);
    item.Id = newId;
    item.Name = 'Product ' + newId;
    item.Qty = 1;
    item.Price = newId * 100;
    item.Amount = item.Qty * item.Price;

    this.Products.push(item);
    this._Cart.next(this.Products);
  }

  RemoveItemFromCart(id: number) {
    this.Products.forEach((t, i) => {
      if (t.Id === id) {
        this.Products.splice(i, 1);
      }
      this._Cart.next(Object.assign([], this.Products));
    });
  }
}
