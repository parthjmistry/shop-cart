import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Product } from 'src/app/Core/Models/ProductModel';
import { ProductService } from 'src/app/Core/Services/product.service';
import { AddproductComponent } from '../addproduct/addproduct.component';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css'],
})
export class ListproductComponent implements OnInit {
  productList: Product[] = [];
  modalRef: BsModalRef | undefined;
  constructor(
    private productService: ProductService,
    private router: Router,
    private modalService: BsModalService
  ) {
    this.getProductList();
  }

  ngOnInit(): void {}

  getProductList() {
    this.productService.getProductData().subscribe((data) => {
      this.productList = data;
    });
  }

  AddProductModal() {
    this.modalRef = this.modalService.show(AddproductComponent);
  }
}
