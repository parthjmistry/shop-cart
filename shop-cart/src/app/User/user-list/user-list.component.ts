import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DataTablesResponse, User, UserViewModel } from 'src/app/User/Model/user-view-model';
import { HttpWrapService } from '../Service/http-wrap.service';
import { UserService } from '../Service/user.service';
import { UserAddComponent } from '../user-add/user-add.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  
  modalRef: BsModalRef | undefined;
  update : User[] = [];
  //userList : UserViewModel[] = [];
  userList : any;
  userAdd: FormGroup | any;
  dtOptions: DataTables.Settings = {};
  

  constructor(private router : Router,private modalService: BsModalService, public datepipe: DatePipe, private _userService: UserService) { }
  
  
  ngOnInit(): void {
    this.dtOptions = {
      serverSide : false,
      //pagingType: 'full_numbers',
      paging: true,
      pageLength: 5,
      //search : true,
      //processing: true, 
      lengthMenu: [[5, 10, 20, -1], [5, 10, 20, "All"]],
   
    };
    this.getUserList("CompanyUser", "Get");
  }
  
getUserList(controller: string, action: string) {
    debugger;
    return this._userService.getUserList<UserViewModel[]>(controller, action)
    .subscribe(data => 
      { 
        console.log(data); this.userList = data
      }
      );
}
 deleteUser(userId : number, name : string): void{
  if(confirm("Are you sure to delete this user " + name)) {
    this.userList = this.userList.filter((item: { UserId: number; }) => item.UserId !== userId);
  //localStorage.setItem('userList', JSON.stringify(this.userList));
  }
  
 }
 
  OpenModalAddUser() {
    debugger;
    this.modalRef = this.modalService.show(UserAddComponent);
    this.modalService.onHidden.subscribe(result => { this.getUserList("CompanyUser", "Get")})
  }

  UpdateUser(userId : number) {
    debugger;
    this.userAdd = { UserId: userId}
    this.modalRef = this.modalService.show(UserAddComponent, { initialState : this.userAdd });
  }
}
