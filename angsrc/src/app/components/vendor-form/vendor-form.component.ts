import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.css']
})
export class VendorFormComponent implements OnInit {
  vendor = {};
  vendorForm: FormGroup= new FormGroup({
    name : new FormControl('', Validators.required),
    gstin : new FormControl(''),
    email : new FormControl(''),
    addressLine1 : new FormControl(''),
    addressLine2 : new FormControl(''),
    city:  new FormControl(''),
    pincode:  new FormControl(''),
    state:  new FormControl(''),
    country: new FormControl(''),
    aAddressLine1 :  new FormControl(''),
    aAddressLine2 : new FormControl(''),
    aCity: new FormControl(''),
    aPincode: new FormControl(''),
    aState: new FormControl(''),
    aCountry: new FormControl(''),
    primaryPhone: new FormControl(''),
    secondaryPhone: new FormControl('')
  });
  constructor() { }

  ngOnInit() {
  }
  submitVendorForm(){

  }

}
