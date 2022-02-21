import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MustMatchValidator } from 'src/app/Helpers/must-match-validator';
import { User } from 'src/app/Model/user-view-model';
@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  userAdd: FormGroup | any;
  submitted = false;
  emailPattern : any;
  updatedArray : User[] = [];
  constructor(private _bsModalRef : BsModalRef, private fb: FormBuilder, private route : Router ) { }
  
  ngOnInit(): void {
    this.emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    this.userAdd = this.fb.group({
      UserId : Math.floor((Math.random() * 10000) + 1),
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      password :['', [Validators.required]],
      confPassword : ['', Validators.required],
      Email: ['', Validators.required, Validators.pattern(this.emailPattern)],
      PhoneNo: ['', Validators.required]
     }, {
      validator: MustMatchValidator('password', 'confPassword')
  });
    
  }
  
  get f() { return this.userAdd.controls; }

  FormSubmit(){
    this.submitted = true;

    if (this.userAdd.invalid) {
        return;
    }
    this.updatedArray = JSON.parse(localStorage.getItem('userList') as string);
    this.updatedArray.push(this.userAdd.value);
    localStorage.setItem('userList', JSON.stringify(this.updatedArray))
    this._bsModalRef.hide();
    // this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.route.navigateByUrl('user-list');
    //this.reloadCurrentRoute();
  }
  public onCancel(): void {
    this._bsModalRef.hide();
}
onReset() {
  this.submitted = false;
  this.userAdd.reset();
}
reloadCurrentRoute() {
  let currentUrl = this.route.url;
      this.route.routeReuseStrategy.shouldReuseRoute = () => false;
      this.route.onSameUrlNavigation = 'reload';
      this.route.navigate([currentUrl]);
  }

}
