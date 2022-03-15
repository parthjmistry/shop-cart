import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MustMatch } from 'src/app/Helpers/must-match-validator';
import { User, UserViewModel } from 'src/app/User/Model/user-view-model';
import { UserService } from '../Service/user.service';
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
  userId : number = 0;
  isEditMode : boolean = false;
  datepipe: any;
  listuser : UserViewModel[] = []
  userDetail! : UserViewModel;
  
  constructor(private _bsModalRef : BsModalRef, private fb: FormBuilder, private route : Router, private modalService: BsModalService, private _userService : UserService, private router: Router ) {
    if(this.modalService.config.initialState != undefined && this.modalService.config.initialState["UserId"] != undefined){
      this.isEditMode = true;
    }
    else{
      this.isEditMode = false;
    }
  }
  
ngOnInit(): void {
  debugger;
  
    if(this.modalService.config.initialState != undefined && this.modalService.config.initialState["UserId"] != undefined){
      this.isEditMode = true;
      
      const updatedData = this.getUserById("CompanyUser", "GetUserById", "2");
      console.log(updatedData);
    }
    else{
      this.isEditMode = false;
    }

    this.emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    this.userAdd = this.fb.group({
      UserId : this.modalService.config.initialState != null && this.modalService.config.initialState['UserId'] != null ? this.modalService.config.initialState['UserId'] : 0,
      FirstName : [this.modalService.config.initialState != null ? this.modalService.config.initialState['FirstName'] : '' , Validators.required],
      LastName: [this.modalService.config.initialState != null ? this.modalService.config.initialState['LastName'] : '', Validators.required],
      password :['', !this.isEditMode ? [Validators.required] : ''],
      confPassword : ['', !this.isEditMode ? [Validators.required] : ''],
      Email: [this.modalService.config.initialState != null ? this.modalService.config.initialState['Email'] : '', [Validators.required, Validators.pattern(this.emailPattern)]],
      PhoneNo: [this.modalService.config.initialState != null ? this.modalService.config.initialState['PhoneNo'] : '', Validators.required],
      DOB: [this.modalService.config.initialState != null ? this.modalService.config.initialState['DOB'] : '', Validators.required]
     }, {
      validator: MustMatch('password', 'confPassword')
  });
  
  }
  
  get f() { return this.userAdd.controls; }

FormSubmit(){
    this.submitted = true;

    if (this.userAdd.invalid && this.userExists(this.userAdd.value.Email)) {
        return;
    }

    return this._userService.addUser("CompanyUser", "CreateUser", this.userAdd.value).subscribe(
      (res : any) => 
      {
        if(res == true){
          this._bsModalRef.hide();
        }
      });

    // if(this.modalService.config.initialState != undefined && this.modalService.config.initialState["UserId"] != undefined){
      
    //   this.userId = this.modalService.config.initialState != null ? Number(this.modalService.config.initialState['UserId']) : 0
    //   this.updatedArray = JSON.parse(localStorage.getItem('userList') as string);
    //   const updatedData = this.updatedArray.map(x => (x.UserId === this.userId ? 
    //     { 
    //       UserId : this.userAdd.value.UserId, 
    //       FirstName : this.userAdd.value.FirstName, 
    //       LastName : this.userAdd.value.LastName, 
    //       PhoneNo : this.userAdd.value.PhoneNo, 
    //       Email : this.userAdd.value.Email, 
    //       DOB : this.userAdd.value.DOB

    //     } : x));
    //   localStorage.setItem('userList', JSON.stringify(updatedData))
    //   this.modalService.config.initialState = undefined;
    //   this._bsModalRef.hide();
    //   this.reloadCurrentRoute();  
    // }
    // else{
      
    //     this.updatedArray = JSON.parse(localStorage.getItem('userList') as string);
    //     this.updatedArray.push(this.userAdd.value);
    //     localStorage.setItem('userList', JSON.stringify(this.updatedArray))
    //     this._bsModalRef.hide();
    // }    
    
  }

onCancel(): void {
    this.modalService.config.initialState = undefined;
    this._bsModalRef.hide();
}

onReset() {
  this.submitted = false;
  this.userAdd.reset();
  this.modalService.config.initialState = undefined;
}

reloadCurrentRoute() {
  let currentUrl = this.route.url;
      this.route.routeReuseStrategy.shouldReuseRoute = () => false;
      this.route.onSameUrlNavigation = 'reload';
      this.route.navigate([currentUrl]);
}

userExists(emailId : string) {
    this.listuser = JSON.parse(localStorage.getItem('userList') as string);
    return this.listuser.some(function(el: { Email: string; }) {
      return el.Email === emailId;
    }); 
  }

  getUserById(controller: string, action: string, param : string) {
    debugger;
    return this._userService.getUserById<UserViewModel>(controller, action, param)
    .subscribe(data => 
      { 
        this.userDetail = data;
        //console.log(data); this.userList = data
      }
      );
}
}
