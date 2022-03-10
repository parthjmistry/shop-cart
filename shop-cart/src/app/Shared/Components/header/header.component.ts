import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CartServiceService } from 'src/app/Cart/Services/cart-service.service';
import { MessageServiceService } from 'src/app/User/Service/message-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userName: string = '';
  subscription: Subscription;
  logged: boolean = false;
  CartItemCount: number = 0;
  CartItemAmount: number = 0;

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

    this.cartService.cartItemCount.subscribe((itemCount) => {
      this.CartItemCount = itemCount;
    });

    this.cartService.cartItemAmount.subscribe((itemAmt) => {
      this.CartItemAmount = itemAmt;
    });
  }

  ngOnInit(): void {}

  btnLogout() {
    this.logged = false;
    this.userName = '';
    localStorage.removeItem('loggedUser');
  }
}
