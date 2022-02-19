import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../Models/ProductModel';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  categoryName = new BehaviorSubject<string>('');
  colorName = new BehaviorSubject<string>('');
  jsonfilePath = 'assets/products.json';
  //jsonfilePath = 'https://angshopcart-default-rtdb.firebaseio.com/products.json'

  productList: Product[] = [];
  categoryList: string[] = [];
  colorList: string[] = [];

  constructor(private http: HttpClient) { }

  getProductData(): Observable<Product[]> {
    return this.http.get<Product[]>(this.jsonfilePath)
  }


  // getProductData(): Observable<Product[]> {
  //   return this.http.get<Product[]>(this.jsonfilePath)
  //     .pipe(
  //       map((data) => {
  //         this.categoryList = [...new Set(data.map((obj) => obj.category))]
  //         this.colorList = [...new Set(data.map((obj) => obj.color))]

  //         return data;
  //       })
  //     )
  // }

  getProductCategories() {
    return this.getProductData().pipe(
      map((data) => [...new Set(data.map((obj) => obj.category))])
    );

    // if (this.categoryList.length > 0) {
    //   return this.categoryList;
    // }
    // else {

    //   this.getProductData().pipe(
    //     map(data => {
    //       this.categoryList = [...new Set(data.map((obj) => obj.category))]
    //     })
    //   );

    //   return this.categoryList;
    // }
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
    );
  }
  getProuductById(pid: number) {
    return this.getProductData().pipe(
      map((data) => data.filter((res) => res.id === pid))
    );
  }
}
