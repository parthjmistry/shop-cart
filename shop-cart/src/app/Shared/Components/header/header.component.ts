import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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

  constructor(private messageService: MessageServiceService) {
    this.subscription = this.messageService.onMessage().subscribe((message) => {
      if (message) {
        this.logged = true;
        this.userName = message.text;
      }
    });

    const currentArray = JSON.parse(localStorage.getItem('cartItem') || '{}');
    for (let i = 0; i < currentArray.length; ++i) {
      this.localCartItemCount += currentArray[i].Qty;
      this.localCartItemPrice += ( currentArray[i].Qty * currentArray[i].price);
    }
  }
  ngOnInit(): void {
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
