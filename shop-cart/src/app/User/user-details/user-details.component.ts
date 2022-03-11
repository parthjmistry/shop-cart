import { Component, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { UserViewModel } from 'src/app/User/Model/user-view-model';
import { UserService } from '../Service/user.service';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userList : UserViewModel[] =[];
  detail : any = {};
  usersData: any;
  constructor(private userService : UserService) {}

  ngOnInit(): void {
    const userObservable = this.userService.getUsers();
        userObservable.subscribe((userList: UserViewModel[]) => {
          this.detail = userList.find(t => t.Email == localStorage.getItem('loggedUser'));
        });
        console.log(this.detail)
  }
}
