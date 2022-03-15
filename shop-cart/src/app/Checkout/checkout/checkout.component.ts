import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartServiceService } from 'src/app/Cart/Services/cart-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  frmgrpBillingDetails!: FormGroup;
  IsFormValid: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _cartService: CartServiceService
  ) {}


  ngOnInit(): void {
    this.frmgrpBillingDetails = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[0-9]{10}$'),
        ],
      ],
      emailAddress: ['', [Validators.required, Validators.email]],
      streetAddress: ['', Validators.required],
      streetAddress2: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      payMethod: ['', Validators.required],
      postcode: [
        '',
        [
          Validators.required,
          Validators.maxLength(6),
          Validators.pattern('^[0-9]{6}$'),
        ],
      ],
    });
  }

  SubmitBillingDetails() {
    if (this.frmgrpBillingDetails.invalid) {
      this.IsFormValid = false;
    } else {
      this.IsFormValid = true;

      this._cartService.setScope(this.frmgrpBillingDetails.value);
    }
  }
}
