import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserViewModel } from '../Model/user-view-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userList : UserViewModel[] =[
    { 
      FirstName : 'Saurabh', 
      LastName : 'Darji', 
      Email : 'saurabh@aspen-it.com', 
      PhoneNo : '123456789' 
    },
    { 
      FirstName : 'Amit', 
      LastName : 'Santoki', 
      Email : 'amit@gmail.com', 
      PhoneNo : '654987123' 
    },
    { 
      FirstName : 'Hitesh', 
      LastName : 'Bavaliya', 
      Email : 'hitesh@aspen-it.com', 
      PhoneNo : '321654987' 
    },
    { 
      FirstName : 'Mayank', 
      LastName : 'Patel', 
      Email : 'mayank@aspen-it.com', 
      PhoneNo : '987654321' 
    },
    { 
      FirstName : 'Keyur', 
      LastName : 'Patel', 
      Email : 'keyur@aspen-it.com', 
      PhoneNo : '258369147' 
    },
    { 
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
