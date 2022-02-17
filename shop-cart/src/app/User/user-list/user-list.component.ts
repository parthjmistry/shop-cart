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
    const userObservable = this.userService.getUsers();
        userObservable.subscribe((UserList: UserViewModel[]) => {
          this.UserList = UserList;
        });
        
  }
 
  OpenModalAddUser() {
    this.modalRef = this.modalService.show(UserAddComponent);
  }
}
