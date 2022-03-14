import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Product } from 'src/app/Core/Models/ProductModel';
import { ProductService } from 'src/app/Core/Services/product.service';
import { AddproductComponent } from '../addproduct/addproduct.component';
import { ProductImageComponent } from '../product-image/product-image.component';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css'],
})
export class ListproductComponent implements OnInit {
  productList: Product[] = [];
  modalRef: BsModalRef | undefined;

  proudctForm: FormGroup | any;

  productUpdate!: Product;

  imageForm: FormGroup | any;

  dtOptions: DataTables.Settings = {};
  constructor(
    private productService: ProductService,
    private router: Router,
    private modalService: BsModalService
  ) {
  
    this.getProductList();
  }

  ngOnInit(): void {
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    //   processing: true, 
    // };

    
  }

  getProductList() {
    this.productService.getProductData().subscribe((data) => {
      this.productList = data;//.sort((a, b) => (a < b ? -1 : 1));
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

  updateProduct(id: number) {
    this.productUpdate = this.productList.filter((item) => item.id == id)[0];
    this.proudctForm = {
      id: this.productUpdate.id,
      name: this.productUpdate.name,
      description: this.productUpdate.description,
      price: this.productUpdate.price,
      category: this.productUpdate.category,
      color: this.productUpdate.color,
      img: this.productUpdate.img,
    };
    this.modalRef = this.modalService.show(AddproductComponent, {
      initialState: this.proudctForm,
    });
  }

  AddProductImageModal(id: number) {
    
    this.productUpdate = this.productList.filter((item) => item.id == id)[0];
    this.imageForm = {
      id: this.productUpdate.id,
    }
    this.modalRef = this.modalService.show(ProductImageComponent, {
      initialState: this.imageForm,
    });
     

    this.modalRef.onHidden?.subscribe((data) => this.getProductList());
  }
}
