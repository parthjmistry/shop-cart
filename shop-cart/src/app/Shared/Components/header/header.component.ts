import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CartServiceService } from 'src/app/Cart/Services/cart-service.service';
import { MessageServiceService } from 'src/app/Service/message-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userName: string = '';
  subscription: Subscription;
  logged: boolean = false;
  localCartItemCount: number = 0;
  localCartItemPrice: number = 0;
  public CartItemCnt : any;

  constructor(
    private messageService: MessageServiceService,
    private cartService: CartServiceService
  ) {
    this.subscription = this.messageService.onMessage().subscribe((message) => {
      if (message) {
        this.logged = true;
        this.userName = message.text;
      }
    });

    const currentArray = JSON.parse(localStorage.getItem('cartItem') || '{}');
    for (let i = 0; i < currentArray.length; ++i) {
      this.localCartItemCount += currentArray[i].Qty;
      this.localCartItemPrice += currentArray[i].Qty * currentArray[i].price;
    }
  }
  ngOnInit(): void {
    this.CartItemCnt = this.cartService.GetCartItemCount();

    // const currentArray = JSON.parse(localStorage.getItem('cartItem') || '{}');
    // for (let i = 0; i < currentArray.length; ++i) {
    //   this.localCartItemCount += currentArray[i].Qty;
    // }
  }
  btnLogout() {
    this.logged = false;
    this.userName = '';
    localStorage.removeItem('loggedUser');
  }
}
