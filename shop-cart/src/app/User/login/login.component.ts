import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageServiceService } from 'src/app/Service/message-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Valid = false;
  show: any = false;
  constructor(private router:Router, private messageService: MessageServiceService) { }

  ngOnInit(): void {
  }
  loginform = new FormGroup({
    emailaddress: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
  });
  onSubmit() {
    if(this.loginform.value.emailaddress == 'admin@gmail.com' && this.loginform.value.password == '123'){
      this.Valid = false;
      localStorage.setItem('loggedUser', this.loginform.value.emailaddress)
      this.messageService.sendMessage(this.loginform.value.emailaddress);
      this.router.navigateByUrl('/user-list');

    }else if(this.loginform.value.emailaddress == 'amit@gmail.com' && this.loginform.value.password == '123'){
      localStorage.setItem('loggedUser', this.loginform.value.emailaddress)
      this.messageService.sendMessage(this.loginform.value.emailaddress);
      this.router.navigateByUrl('/user-details');
    }
    else{
      this.Valid = true;
    }
  }
  
  password() {
    this.show = !this.show;
  }
}
