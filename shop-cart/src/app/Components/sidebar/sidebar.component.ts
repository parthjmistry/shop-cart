import { Component, OnInit } from '@angular/core';
import { ProductFilters } from 'src/app/Core/Models/ProductModel';
import { ProductService } from 'src/app/Core/Services/product.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  categoryList: string[] = [];
  colorList: string[] = [];

  productFilters: ProductFilters = {
    category: [],
    color: [],
  } as ProductFilters;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getCategoryList();
    this.getColorList();
  }

  getCategoryList() {
    this.productService.getProductCategoryList().subscribe((data) => {
      this.categoryList = data;
    });
  }

  getColorList() {
    this.productService.getProductColorList().subscribe((data) => {
      this.colorList = data;
    });
  }

  getProductByFilter(filterType: string, filterValue: string) {
    if (filterType === 'category') {
      if (!this.productFilters.category.includes(filterValue)) {
        this.productFilters.category.push(filterValue);
      } else {
        if (this.productFilters.category.length > 0) {
          this.removeElementFromStringArray(
            this.productFilters.category,
            filterValue
          );
        }
      }
    } else {
      if (!this.productFilters.color.includes(filterValue)) {
        this.productFilters.color.push(filterValue);
      } else {
        if (this.productFilters.color.length > 0) {
          this.removeElementFromStringArray(
            this.productFilters.color,
            filterValue
          );
        }
      }
    }

    // set value to subscriber
    this.productService.productFilterCriteria$.next(this.productFilters);
  }

  removeElementFromStringArray(array: string[], arrayValue: string) {
    array.forEach((value, index) => {
      if (value == arrayValue) array.splice(index, 1);
    });
  }

  getColorStyle(color: string) {
    let colorStyles = {
      'background-color': color,
      'box-shadow': '0px 0px 0px 2px ' + (!this.productFilters.color.includes(color) ? 'transparent': color) ,
    };
    return colorStyles;
  }
}
