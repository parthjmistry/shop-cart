import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserViewModel } from 'src/app/Model/user-view-model';
import { UserService } from 'src/app/Service/user.service';
import { UserAddComponent } from '../user-add/user-add.component';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  modalRef: BsModalRef | undefined;
  constructor(private userService : UserService, private router : Router,private modalService: BsModalService) { }
  UserList : UserViewModel[] = []
  
  ngOnInit(): void {
    this.getUserList();
  }
  getUserList(){
    if(localStorage.getItem('userList') === null)
    {
      const userObservable = this.userService.getUsers();
          userObservable.subscribe((UserList: UserViewModel[]) => {
            this.UserList = UserList;
            localStorage.setItem('userList', JSON.stringify(this.UserList));
          });
      }
      else{
        
        this.UserList = JSON.parse(localStorage.getItem('userList') as string);
      }
  }
 deleteUser(userId : number, name : string): void{
  if(confirm("Are you sure to delete this user " + name)) {
    this.UserList = this.UserList.filter(item => item.UserId !== userId);
  localStorage.setItem('userList', JSON.stringify(this.UserList));
  }
  
 }
 
  OpenModalAddUser() {
    this.modalRef = this.modalService.show(UserAddComponent);
    this.modalService.onHidden.subscribe(result => { this.getUserList()})
  }
}
