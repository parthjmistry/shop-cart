import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageServiceService } from 'src/app/Service/message-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: string = '';
  subscription: Subscription;
  logged : boolean = false;
    constructor(private messageService: MessageServiceService) {
        this.subscription = this.messageService.onMessage().subscribe(message => {
            if (message) {
              this.logged = true;
              this.userName = message.text;
            } 
        });
    }
  ngOnInit(): void {
  }
  btnLogout(){
    this.logged = false;
    this.userName = '';
    localStorage.removeItem('loggedUser');
  }
}
