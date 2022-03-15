import { Component, OnInit } from '@angular/core';
import { CartModelNew } from 'src/app/Cart/Models/cart-model';
import { CartServiceService } from 'src/app/Cart/Services/cart-service.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  CartItems: CartModelNew[] = [];
  CartItemAmount: number = 0;
  billingDetails: [] = [];
  constructor(private cartService: CartServiceService) {}

  ngOnInit(): void {
    this.CartItems = JSON.parse(localStorage.getItem('cartItem') || '{}');
    this.cartService.cartItemAmount.subscribe((itemAmt) => {
      this.CartItemAmount = itemAmt;
    });

    this.billingDetails = this.cartService.getScope();
    console.log(this.billingDetails);
  }
}
