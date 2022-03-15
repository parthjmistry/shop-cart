import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartServiceService } from 'src/app/Cart/Services/cart-service.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  billingDetails: any;

  constructor(private _cartService: CartServiceService) { }

  ngOnInit(): void {
    this.billingDetails = this._cartService.UserBillingDetails.subscribe(
      (data) => {
        this.billingDetails = JSON.stringify(data);
        console.log(data);
        console.log(this.billingDetails);
      }
    );
  }
}
