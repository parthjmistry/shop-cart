import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartModel } from 'src/app/Cart/Models/cart-model';
import { Product } from 'src/app/Core/Models/ProductModel';
import { ProductService } from 'src/app/Core/Services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  baseUrl: string = environment.baseUrl;
  categoryName: string = '';
  productList: Product[] = [];

  //cartData =  JSON.parse(localStorage.getItem('cartItem'));

  cartData = (() => {
    const fieldValue = localStorage.getItem('cartItem');
    return fieldValue === null ? [] : JSON.parse(fieldValue);
  })();

  //categoryName: string;

  constructor(private productService: ProductService) {
    // subscribe category name from subject
    this.productService.categoryName.subscribe((res: string) => {
      this.categoryName = res;

      // console.log(res);

      if (!this.categoryName) {
        this.getProductList();
      } else {
        this.getProuductByCategory(res);
      }
    });
  }

  ngOnInit(): void {
    // reset subject
    //this.productService.categoryName.next('');
    //this.cartData =  JSON.parse(localStorage.getItem('cartItem') || '{}');
  }

  getProductList() {
    this.productService.getProductData().subscribe((data) => {
      //console.log(data);
      this.productList = data;
    });
  }

  getProuductByCategory(category: string) {
    this.productService.getProuductByCategory(category).subscribe((data) => {
      //console.log(data);
      this.productList = data;
    });
  }

  // ngOnDestroy(): void {
  //   // reset subject
  //   this.productService.categoryName.next('');
  // }

  addToCart(pid: number) {
    this.productService.getProuductById(pid).subscribe((data) => {
      const itemId = data[0].id;
      const isItemexits = this.cartData?.filter((res: any) => res.id === itemId);

      if (isItemexits.length > 0) {
        this.cartData.filter((res: any) => res.id === itemId)[0].Qty += 1;

      } else {
        this.cartData.push(data[0]);
        this.cartData.filter((res: any) => res.id === itemId)[0].Qty = 1;
      }

      localStorage.setItem('cartItem', JSON.stringify(this.cartData));
    });
  }
}
