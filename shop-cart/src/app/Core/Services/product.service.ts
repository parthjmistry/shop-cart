import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, from, Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Product } from '../Models/ProductModel';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  
  categoryName = new BehaviorSubject<string>('');
  colorName = new BehaviorSubject<string>('');
  jsonfilePath = 'assets/products.json';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }
  

  addProduct(product:Product): Observable<Product> {
    return this.http.post<Product>(this.jsonfilePath, JSON.stringify(product), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
   
  getProductData(): Observable<Product[]> {
    return this.http.get<Product[]>(this.jsonfilePath);
  }

  getProductCategories() {
    return this.getProductData().pipe(
      map((data) => [...new Set(data.map((obj) => obj.category))])
    );
  }

  getProuductByCategory(category: string) {
    return this.getProductData().pipe(
      map((data) => data.filter((res) => res.category === category))
    );
  }
  getProductColors() {
    return this.getProductData().pipe(
      map((data) => [...new Set(data.map((obj) => obj.color))])
    );
  }
  getProuductByColor(color: string) {
    return this.getProductData().pipe(
      map((data) => data.filter((res) => res.color === color))
    );}
  getProuductById(pid: number) {
    return this.getProductData().pipe(
      map((data) => data.filter((res) => res.id === pid))
    );
  }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
  
  
}
