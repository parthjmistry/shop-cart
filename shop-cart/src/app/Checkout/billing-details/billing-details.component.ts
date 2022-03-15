import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.css'],
})
export class BillingDetailsComponent implements OnInit {
  frmgrpBillingDetails!: FormGroup;
  IsFormValid: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
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
      console.log(this.frmgrpBillingDetails.value);
    }
  }
}
