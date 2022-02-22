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
      this.productList = data.sort((a, b) => (a < b ? -1 : 1));
    });
  }

  deleteProduct(id: number) {
    if (confirm('are you sure want to delete?')) {
      this.productService.delete(id).subscribe((data) => {
        this.getProductList();
      });
    }
  }

  AddProductModal() {
    this.modalRef = this.modalService.show(AddproductComponent);
    this.modalRef.onHidden?.subscribe((data) => this.getProductList());
  }
}
