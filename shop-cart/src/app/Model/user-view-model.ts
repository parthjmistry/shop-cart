export interface UserViewModel {
    UserId : number,
    FirstName : string,
    LastName : string,
    Email :string,
    PhoneNo : string,
    password: string,
    confPassword: string
}
export class User
{
    UserId : number = 0;
    FirstName : string = '';
    LastName : string = '';
    Email : string = '';
    PhoneNo : string = '';
}
