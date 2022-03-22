import {  AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Product } from 'src/app/Core/Models/ProductModel';
import { ProductService } from 'src/app/Core/Services/product.service';
import { environment } from 'src/environments/environment';
import { AddproductComponent } from '../addproduct/addproduct.component';
import { ProductImageComponent } from '../product-image/product-image.component';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css'],
})
export class ListproductComponent implements OnDestroy, OnInit {
  
  baseUrl: string = environment.baseUrl;
  productList: Product[] = [];
  modalRef: BsModalRef | undefined;

  proudctForm: FormGroup | any;

  productUpdate!: Product;

  imageForm: FormGroup | any;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  constructor(
    private productService: ProductService,
    private router: Router,
    private modalService: BsModalService
  ) {
  
     
  }

  ngOnInit(): void {
    this.dtOptions = {
      //pagingType: 'full_numbers',
      //paging: true,
      pageLength: 5,
      //search : true,
      processing: true, 
      lengthMenu: [[5, 10, 20, -1], [5, 10, 20, "All"]],
    };

    this.getProductList();
  }
  

  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getProductList() {
    this.productService.getProductData().subscribe((data) => {
      this.productList = data.sort((a, b) => (a < b ? -1 : 1));

      this.dtTrigger.next(0);
      
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

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(0);
    });
  }
}
