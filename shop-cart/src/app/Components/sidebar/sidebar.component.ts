import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Core/Services/product.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  categoryList: string[] = [];
  colorList: string[] = [];

  constructor(private productService: ProductService) {
    
  }

  ngOnInit(): void {

    this.productService.categoryList.subscribe((res) => {
      this.categoryList = res;
    });

    this.productService.colorList.subscribe((res) => {
      this.colorList = res;
    });
  }

  // getCategoryList() {
  //   this.productService.getProductCategories().subscribe((data) => {
  //     //console.log(data);
  //     this.categoryList = data;
  //   });
  // }

  // getColorList() {
  //   this.productService.getProductColors().subscribe((data) => {
  //     this.colorList = data;
  //   });
  // }

  getProductByCategory(categoryName: string) {
    this.productService.categoryName.next(categoryName);
  }
  getProductByColor(colorName: string) {
    this.productService.colorName.next(colorName);
  }
  

  ngOnDestroy(): void {
    // reset subject
    this.productService.categoryName.next('');
    this.productService.colorName.next('');

    this.productService.categoryList.next([]);
    this.productService.colorList.next([]);
  }
}
