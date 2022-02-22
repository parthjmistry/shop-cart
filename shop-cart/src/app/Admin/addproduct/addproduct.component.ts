import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProductService } from 'src/app/Core/Services/product.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
})
export class AddproductComponent implements OnInit {
  productForm: FormGroup | any;
  submitted = false;

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      category: ['', Validators.required],
      color: ['', Validators.required],
      img: ['', Validators.required],
    });
  }

  get f() {
    return this.productForm.controls;
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public productService: ProductService,
    private bsModalRef: BsModalRef
  ) {}
  submitForm() {
    this.submitted = true;

    if (this.productForm.invalid) {
      return;
    }

    console.log(this.productForm.value);

    this.productService.addProduct(this.productForm.value).subscribe((res) => {
      //console.log(this.productForm.value);
      this.productForm.reset();
      this.bsModalRef.hide();
      
    });
  }

  public onCancel(): void {
    this.productForm.reset();
    this.bsModalRef.hide();
  }
  onReset() {
    this.submitted = false;
    this.productForm.reset();
  }
}
