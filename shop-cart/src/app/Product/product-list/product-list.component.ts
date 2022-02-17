import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
}
