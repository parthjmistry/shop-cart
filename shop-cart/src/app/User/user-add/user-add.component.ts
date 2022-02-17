import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MustMatchValidator } from 'src/app/Helpers/must-match-validator';
@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  userAdd: FormGroup | any;
  submitted = false;
  emailPattern : any;
  constructor(private _bsModalRef : BsModalRef, private fb: FormBuilder, ) { }
  
  ngOnInit(): void {
    this.emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    this.userAdd = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password :['', [Validators.required, Validators.minLength(6)]],
      confPassword : ['', Validators.required],
      email: ['', Validators.required, Validators.pattern(this.emailPattern)],
      phoneNo: ['', Validators.required]
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
  }
  public onCancel(): void {
    this._bsModalRef.hide();
}
onReset() {
  this.submitted = false;
  this.userAdd.reset();
}

}
