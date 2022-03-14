import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProductService } from 'src/app/Core/Services/product.service';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.css'],
})
export class ProductImageComponent implements OnInit {
  public progress!: number;
  public message!: string;

  productId: number = 0;

  constructor(
    private http: HttpClient,
    private bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private productService: ProductService
  ) {}
  ngOnInit() {
    if (
      this.modalService.config.initialState != undefined &&
      this.modalService.config.initialState['id'] != undefined
    ) {
      this.productId = Number(this.modalService.config.initialState!['id']);
    }
  }
  public uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let filesToUpload: File[] = files;
    const formData = new FormData();

    Array.from(filesToUpload).map((file, index) => {
      return formData.append('file' + index, file, file.name);
    });

    this.http
      .post('https://sampleapi.aspen-it.com/User/UploadFile', formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round((100 * event.loaded) / event.total!);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
           
          if (this.productId > 0) {
            this.productService
              .getProuductById(this.productId)
              .subscribe((data) => {
                const productDetail = data[0];

                productDetail.img = filesToUpload[0].name
                 
                // update image name to product array
                this.productService
                .updateProduct(this.productId,productDetail)
                .subscribe((res) => {
                  this.productId = 0;
                  this.bsModalRef.hide();
                });
              });
          }
        }
      });
  };
}
