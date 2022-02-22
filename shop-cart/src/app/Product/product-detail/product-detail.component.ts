import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartServiceService } from 'src/app/Cart/Services/cart-service.service';
import { Product } from 'src/app/Core/Models/ProductModel';
import { ProductService } from 'src/app/Core/Services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {

  baseUrl: string = environment.baseUrl;

  productDetail: Product = {} as Product;

  productId = 0;

  cartData = (() => {
    const fieldValue = localStorage.getItem('cartItem');
    return fieldValue === null ? [] : JSON.parse(fieldValue);
  })();


  constructor(
    private _route: ActivatedRoute,
    private productService: ProductService,
    private _cartService: CartServiceService
  ) {}

  ngOnInit(): void {
    this.productId = Number(this._route.snapshot.paramMap.get('id'));

    if (this.productId > 0) {
      this.getProductDetail(this.productId);
    }
  }

  getProductDetail(id: number) {
    this.productService.getProuductById(id).subscribe((data) => {
      this.productDetail = data[0];
    });
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
