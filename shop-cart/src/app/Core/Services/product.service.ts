import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  BehaviorSubject,
  from,
  Observable,
  of,
  Subject,
  throwError,
} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Product, ProductFilters } from '../Models/ProductModel';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  jsonfilePath = 'http://localhost:3000/products';

  productList: Product[] = [];

  productFilterCriteria$ = new Subject<ProductFilters>();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  addProduct(product: Product) {
    return this.http
      .post<Product>(
        this.jsonfilePath,
        JSON.stringify(product),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  getProductData(): Observable<Product[]> {
    return this.http.get<Product[]>(this.jsonfilePath).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getProductCategoryList() {
    return of(['accessories', 'scifi', 'mystery', 'cookbooks', 'business'].sort());
  }

  getProductColorList(): Observable<string[]> {
    return of(['red', 'green', 'pink','gray', 'blue', 'black'].sort());
  }
 
  getProuductById(pid: number) {
    return this.getProductData().pipe(
      map((data) => data.filter((res) => res.id === pid))
    );
  }

  getProductByFilterData(
    productFilters: ProductFilters
  ): Observable<Product[]> {
    return this.http.get<Product[]>(this.jsonfilePath).pipe(
      map((data) => {
        var filteredProduct : Product[]  = [];

        if (
          productFilters.category.length > 0 &&
          productFilters.color.length > 0
        ) {
          filteredProduct = data.filter((el) => {
            return (
              productFilters.category.includes(el.category) &&
              productFilters.color.includes(el.color)
            );
          });
        } else if (productFilters.category.length > 0) {
          filteredProduct = data.filter((el) => {
            return productFilters.category.includes(el.category);
          });
        }
        else if (productFilters.color.length > 0) {
          filteredProduct = data.filter((el) => {
            return productFilters.color.includes(el.color);
          });
        }

        return filteredProduct;
      })
    );
  }

  // Delete
  delete(id: any) {
    var API_URL = `${this.jsonfilePath}/${id}`;
    return this.http.delete(API_URL).pipe(catchError(this.errorHandler));
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http
      .put<Product>(
        this.jsonfilePath + '/' + id,
        JSON.stringify(product),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //console.log(errorMessage);
    return throwError(errorMessage);
  }
}
