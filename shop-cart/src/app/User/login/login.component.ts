import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Valid = false;
  show: any = false;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  loginform = new FormGroup({
    emailaddress: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
  });
  onSubmit() {
    if(this.loginform.value.emailaddress == 'amit@gmail.com' && this.loginform.value.password == '123'){
      this.Valid = false;
      this.router.navigate(['/user-list']);

    }else{
      this.Valid = true;
    }
  }
  password() {
    this.show = !this.show;
  }
}
