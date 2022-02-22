import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../Services/cart-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItemCount: number = 0;
  cartItemAmount: number = 0;

  constructor(private _cartService: CartServiceService) {
  }

  ngOnInit(): void {
    this._cartService.cartItemCount.subscribe((itemCount) => {
      this.cartItemCount = itemCount;
    });

    this._cartService.cartItemAmount.subscribe((itemAmt) => {
      this.cartItemAmount = itemAmt;
    });
  }
}
