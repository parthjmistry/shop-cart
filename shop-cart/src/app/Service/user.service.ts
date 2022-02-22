import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserViewModel } from '../Model/user-view-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userList : UserViewModel[] =[
    { 
      UserId : 1,
      FirstName : 'Saurabh', 
      LastName : 'Darji', 
      Email : 'saurabh@aspen-it.com', 
      PhoneNo : '123456789' 
    },
    { 
      UserId : 2,
      FirstName : 'Amit', 
      LastName : 'Santoki', 
      Email : 'amit@gmail.com', 
      PhoneNo : '654987123' 
    },
    { 
      UserId : 3,
      FirstName : 'Hitesh', 
      LastName : 'Bavaliya', 
      Email : 'hitesh@aspen-it.com', 
      PhoneNo : '321654987' 
    },
    { 
      UserId : 4,
      FirstName : 'Mayank', 
      LastName : 'Patel', 
      Email : 'mayank@aspen-it.com', 
      PhoneNo : '987654321' 
    },
    { 
      UserId : 5,
      FirstName : 'Keyur', 
      LastName : 'Patel', 
      Email : 'keyur@aspen-it.com', 
      PhoneNo : '258369147' 
    },
    { 
      UserId : 6,
      FirstName : 'Hiren', 
      LastName : 'Nayankpara', 
      Email : 'hiten@aspen-it.com', 
      PhoneNo : '369258369' 
    },
  ];
  constructor() { }
  public getUsers(): any {
    const userObservable = new Observable(observer => {
               observer.next(this.userList);
    });

    return userObservable;
}
}
