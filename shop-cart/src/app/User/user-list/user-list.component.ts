import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { DataTablesResponse, User, UserViewModel } from 'src/app/User/Model/user-view-model';
import { environment } from 'src/environments/environment';
import { HttpWrapService } from '../Service/http-wrap.service';
import { UserService } from '../Service/user.service';
import { UserAddComponent } from '../user-add/user-add.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  baseUrl: string = environment.baseUrl;
  modalRef: BsModalRef | undefined;
  update : User[] = [];
  userList : any;
  userAdd: FormGroup | any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  

  constructor(private router : Router,private modalService: BsModalService, public datepipe: DatePipe, private _userService: UserService) { }
  
  
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      paging: true,
      pageLength: 5,
      processing: true, 
      lengthMenu: [[5, 10, 20, -1], [5, 10, 20, "All"]],
    };
    this.dtTrigger.next(0);
    this.getUserList("CompanyUser", "Get");
    
     

  }
  ngAfterViewInit(): void {
    //this.dtTrigger.next();
    //this.dtTrigger.next(0);
    }

    ngOnDestroy(): void {
      // Don't forget to unsubscribe to event.
      //this.dtTrigger.unsubscribe();
    }
getUserList(controller: string, action: string) {
    return this._userService.getUserList<UserViewModel[]>(controller, action)
    .subscribe(data => 
      { 
        console.log(data); this.userList = data;
        //this.dtTrigger.next(0);
      }
      );
}
 deleteUser(userId : string, name : string){
   debugger;
  if(confirm("Are you sure to delete this user " + name)) {
    this._userService.delete("CompanyUser", "DeleteUser", userId).subscribe(() => console.log('user Deleted'));
  }
  
 }
 
  OpenModalAddUser() {
    this.modalRef = this.modalService.show(UserAddComponent);
    this.modalService.onHidden.subscribe(result => { this.getUserList("CompanyUser", "Get")})
  }

  UpdateUser(userId : number) {
    this.userAdd = { UserId: userId}
    this.modalRef = this.modalService.show(UserAddComponent, { initialState : this.userAdd });
  }
}
