import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpWrapService {

  //apiUrl = 'https://localhost:44306/';
  apiUrl = 'https://angsampleapi.aspen-it.com/';
  
  constructor(private _http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    })
  };

  get<T>(controller: string, action: string): Observable<T> {
    return this._http.get<T>(this.apiUrl + controller + '/'+ action, this.httpOptions);
 }

 post(controller: string, action: string, postdata : any) {
  const body=JSON.stringify(postdata);
  console.log(body)
  debugger;
  return this._http.post(this.apiUrl + controller  + '/'+ action, body, this.httpOptions)
}

getById<T>(controller: string, action: string, params : string): Observable<T> {
  return this._http.get<T>(this.apiUrl + controller + '/'+ action + '/' + params, this.httpOptions);
}

}
