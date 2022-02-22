import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProductService } from 'src/app/Core/Services/product.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
})
export class AddproductComponent implements OnInit {
  productForm: FormGroup | any;
  submitted = false;

  isEdit: boolean = false;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public productService: ProductService,
    private bsModalRef: BsModalRef,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      name: [
        this.modalService.config.initialState != null
          ? this.modalService.config.initialState['name']
          : '',
        Validators.required,
      ],
      description: [
        this.modalService.config.initialState != null
          ? this.modalService.config.initialState['description']
          : '',
        Validators.required,
      ],
      price: [
        this.modalService.config.initialState != null
          ? this.modalService.config.initialState['price']
          : '',
        Validators.required,
      ],
      category: [
        this.modalService.config.initialState != null
          ? this.modalService.config.initialState['category']
          : '',
        Validators.required,
      ],
      color: [
        this.modalService.config.initialState != null
          ? this.modalService.config.initialState['color']
          : '',
        Validators.required,
      ],
      img: [
        this.modalService.config.initialState != null
          ? this.modalService.config.initialState['img']
          : '',
        Validators.required,
      ],
    });

    if (
      this.modalService.config.initialState != undefined &&
      this.modalService.config.initialState['name'] != undefined
    ) {
      this.isEdit = true;
    } else {
      this.isEdit = false;
    }
  }

  get f() {
    return this.productForm.controls;
  }

  submitForm() {
    this.submitted = true;

    if (this.productForm.invalid) {
      return;
    }
 
    if (!this.isEdit) {
      //console.log('add product');
      this.productService
        .addProduct(this.productForm.value)
        .subscribe((res) => {
          //console.log(this.productForm.value);
          this.productForm.reset();
          this.bsModalRef.hide();
        });
    } else {
      //console.log('update product');
      //console.log(Number(this.modalService.config.initialState!['id']));

      this.productService
      .updateProduct(Number(this.modalService.config.initialState!['id']), this.productForm.value)
      .subscribe((res) => {
        
        this.productForm.reset();
        this.bsModalRef.hide();
      });
    }
  }

  public onCancel(): void {
    this.isEdit = false;
    this.productForm.reset();
    this.bsModalRef.hide();
  }
  onReset() {
    this.submitted = false;
    this.productForm.reset();
  }
}
