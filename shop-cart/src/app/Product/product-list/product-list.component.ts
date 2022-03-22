import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartModel } from 'src/app/Cart/Models/cart-model';
import { CartServiceService } from 'src/app/Cart/Services/cart-service.service';
import { Product, ProductFilters } from 'src/app/Core/Models/ProductModel';
import { ProductService } from 'src/app/Core/Services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  baseUrl: string = environment.baseUrl;

  productImgUrl: string =  this.baseUrl + 'assets/img/product-img/';

  productList: Product[] = [];

  cartData = (() => {
    const fieldValue = localStorage.getItem('cartItem');
    return fieldValue === null ? [] : JSON.parse(fieldValue);
  })();

  //categoryName: string;

  constructor(
    private productService: ProductService,
    private _cartService: CartServiceService
  ) {
    // subscribe the product filters
    this.productService.productFilterCriteria$.subscribe((data) => {
      if (data.category.length > 0 || data.color.length > 0) {
        this.getProductByFilters(data);
      } else {
        this.getProductList();
      }
    });
  }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.productService.getProductData().subscribe((data) => {
      this.productList = data;
    });
  }

  getProductByFilters(productFilters: ProductFilters) {
    this.productService
      .getProductByFilterData(productFilters)
      .subscribe((data) => {
        this.productList = data;
      });
  }
  getColorStyle(color: string) {
    let colorStyles = {
      'background-color': color,
      'box-shadow': '0px 0px 0px 2px ' + color,
      'box-sizing': 'border-box',
      border: '2px solid #fff',
      'border-radius': '50%',
      width: '25px',
      float: 'right',
    };
    return colorStyles;
  }
  addToCart(pid: number) {
    this.productService.getProuductById(pid).subscribe((data) => {
      const itemId = data[0].id;
      const isItemexits = this.cartData?.filter(
        (res: any) => res.id === itemId
      );

      if (isItemexits.length > 0) {
        this.cartData.filter((res: any) => res.id === itemId)[0].Qty += 1;
      } else {
        this.cartData.push(data[0]);
        this.cartData.filter((res: any) => res.id === itemId)[0].Qty = 1;
      }

      localStorage.setItem('cartItem', JSON.stringify(this.cartData));
      alert(data[0].name + ' added in cart.');
      this._cartService.setCartItemCount();
    });
  }
}
