import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.css']
})
export class BillingDetailsComponent implements OnInit {

  userBillingDetails = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('',[Validators.required]),
    company: new FormControl('',[Validators.required]),
    country: new FormControl('',[Validators.required]),
    street_address: new FormControl('',[Validators.required]),
    street_address2: new FormControl('',[Validators.required]),
    postcode: new FormControl('',[Validators.required]),
    city: new FormControl('',[Validators.required]),
    state: new FormControl('',[Validators.required]),
    phone_number: new FormControl('',[Validators.required]),
    email_address: new FormControl('',[Validators.required]),
  });
  

  constructor() { }

  ngOnInit(): void {
  }

}
