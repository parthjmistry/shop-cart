import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserViewModel } from '../Model/user-view-model';
import { HttpWrapService } from './http-wrap.service';

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
      PhoneNo : '123456789', 
      password: '',
      confPassword: '',
      DOB: new Date,
      ProfilePhoto : '' 
    },
    { 
      UserId : 2,
      FirstName : 'Amit', 
      LastName : 'Santoki', 
      Email : 'amit@gmail.com', 
      PhoneNo : '654987123',
      password: '',
      confPassword: '', 
      DOB: new Date,
      ProfilePhoto : '' 
    },
    { 
      UserId : 3,
      FirstName : 'Hitesh', 
      LastName : 'Bavaliya', 
      Email : 'hitesh@aspen-it.com', 
      PhoneNo : '321654987',
      password: '',
      confPassword: '', 
      DOB: new Date,
      ProfilePhoto : '' 
    },
    { 
      UserId : 4,
      FirstName : 'Mayank', 
      LastName : 'Patel', 
      Email : 'mayank@aspen-it.com', 
      PhoneNo : '987654321',
      password: '',
      confPassword: '', 
      DOB: new Date,
      ProfilePhoto : '' 
    },
    { 
      UserId : 5,
      FirstName : 'Keyur', 
      LastName : 'Patel', 
      Email : 'keyur@aspen-it.com', 
      PhoneNo : '258369147',
      password: '',
      confPassword: '', 
      DOB: new Date ,
      ProfilePhoto : ''
    },
    { 
      UserId : 6,
      FirstName : 'Hiren', 
      LastName : 'Nayakpara', 
      Email : 'hiten@aspen-it.com', 
      PhoneNo : '369258369',
      password: '',
      confPassword: '', 
      DOB: new Date ,
      ProfilePhoto : ''
    },
  ];
  constructor(private http : HttpWrapService) { }
  public getUsers(): any {
    const userObservable = new Observable(observer => {
               observer.next(this.userList);
    });

    return userObservable;
}

addUser(controller : string, action : string, postdata : any) {
  debugger;
  return this.http.post(controller, action, postdata)
}

getUserList<T>(controller : string, action : string) : Observable<T> {
  return this.http.get<T>(controller, action)
}

getUserById<T>(controller : string, action : string, param : string) : Observable<T> {
  return this.http.getById<T>(controller, action, param)
}
delete(controller : string, action : string, param : string){
  return this.http.delete(controller, action, param)
}
}
