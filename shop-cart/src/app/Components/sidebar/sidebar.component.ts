import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Core/Services/product.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  categoryList: string[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getCategoryList();
    //this.productService.categoryName.next('');
  }

  getCategoryList() {
    this.productService.getProductCategories().subscribe((data) => {
      //console.log(data);
      this.categoryList = data;
    });
  }

  getProductByCategory(categoryName: string) {
    this.productService.categoryName.next(categoryName);
  }

  ngOnDestroy(): void {
    // reset subject
    this.productService.categoryName.next('');
  }
}
