import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  show: any = false;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  RegistraionForm = new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    userName: new FormControl('',Validators.required),
    password: new FormControl('',[Validators.required, Validators.minLength(8)]),
    confirmpassword: new FormControl('',Validators.required),
    contact: new FormControl('',[Validators.required, Validators.minLength(10)]),
    isDelete: new FormControl(true),
    createdDate: new FormControl(new Date()),
  });
  onSubmit() {
    //this.httpuserwrap.createuser(this.RegistraionForm.value).subscribe(data => {console.log('usercreate')});
    console.log('usercreate')
    this.router.navigate(['/user-list']);
  }
  password() {
    this.show = !this.show;
  }
}
