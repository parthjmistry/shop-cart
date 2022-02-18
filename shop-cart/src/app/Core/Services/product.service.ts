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

  constructor(private http: HttpClient) { }
  
   
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
}
