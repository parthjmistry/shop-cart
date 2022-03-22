import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartModelNew } from 'src/app/Cart/Models/cart-model';
import { CartServiceService } from 'src/app/Cart/Services/cart-service.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css'],
})
export class OrderSuccessComponent implements OnInit {
  billingDetails: any;

  CartItems: CartModelNew[] = [];
  CartItemAmount: number = 0;

  constructor(private _cartService: CartServiceService) {}

  ngOnInit(): void {
    // this.billingDetails = this._cartService.UserBillingDetails.subscribe(
    //   (data) => {
    //     this.billingDetails = data;
    //     console.log(this.billingDetails);
    //   }
    // );

    this._cartService.currentBillingInfo.subscribe(
      data => this.billingDetails = data
    )

    this.CartItems = JSON.parse(localStorage.getItem('cartItem') || '{}');
    this._cartService.cartItemAmount.subscribe((itemAmt) => {
      this.CartItemAmount = itemAmt;
    });
  }
}
