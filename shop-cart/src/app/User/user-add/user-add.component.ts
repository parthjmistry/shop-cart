import { HttpClient, HttpEventType, JsonpClientBackend } from '@angular/common/http';
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
  public progress!: number;
  public message!: string;


  constructor(private _bsModalRef : BsModalRef, private fb: FormBuilder, private route : Router, private modalService: BsModalService, private _userService : UserService, private router: Router, private http: HttpClient ) {
    if(this.modalService.config.initialState != undefined && this.modalService.config.initialState["UserId"] != undefined){
      this.isEditMode = true;
    }
    else{
      this.isEditMode = false;
    }
  }
  
ngOnInit(): void {
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
      DOB: [this.modalService.config.initialState != null ? this.modalService.config.initialState['DOB'] : '', Validators.required],
      ProfilePhoto : ''
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
    this.userAdd.value.ProfilePhoto = localStorage.getItem('uploadFile')
    return this._userService.addUser("CompanyUser", "CreateUser", this.userAdd.value).subscribe(
      (res : any) => 
      {
        if(res == true){
          this._bsModalRef.hide();
        }
      });
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
    return this._userService.getUserById<UserViewModel>(controller, action, param)
    .subscribe(data => 
      { 
        this.userDetail = data;
        //console.log(data); this.userList = data
      }
      );
}

public uploadFile = (files: any) => {
  if (files.length === 0) {
    return;
  }
  let filesToUpload: File[] = files;
  const formData = new FormData();

  Array.from(filesToUpload).map((file, index) => {
    return formData.append('file' + index, file, file.name);
  });

  this.http
    .post('https://angsampleapi.aspen-it.com/CompanyUser/ProfilePhoto', formData, {
      reportProgress: true,
      observe: 'events',
    })
    .subscribe((event) => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round((100 * event.loaded) / event.total!);
      else if (event.type === HttpEventType.Response) {
        this.message = 'Upload success.';
         localStorage.setItem('uploadFile', files[0].name);
      }
    });
};
}
