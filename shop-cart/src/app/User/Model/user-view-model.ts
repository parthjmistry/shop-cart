export interface UserViewModel {
    UserId : number,
    FirstName : string,
    LastName : string,
    Email :string,
    PhoneNo : string,
    password: string,
    confPassword: string,
    DOB : Date
}
export class User
{
    UserId : number = 0;
    FirstName : string = '';
    LastName : string = '';
    Email : string = '';
    PhoneNo : string = '';
    DOB : Date = new Date()
}
export class DataTablesResponse {
    data?: any[];
    draw?: number;
    recordsFiltered?: number;
    recordsTotal?: number;
}
