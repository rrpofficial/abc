import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VendorService, Vendor } from '../../services/vendor.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { FlashMessagesService } from 'angular2-flash-messages';
import { NotifierService } from 'angular-notifier';

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
    pAddressline1 : new FormControl(''),
    pAddressline2 : new FormControl(''),
    pCity:  new FormControl(''),
    pPincode:  new FormControl(''),
    pState:  new FormControl(''),
    pCountry: new FormControl(''),
    aAddressline1 :  new FormControl(''),
    aAddressline2 : new FormControl(''),
    aCity: new FormControl(''),
    aPincode: new FormControl(''),
    aState: new FormControl(''),
    aCountry: new FormControl(''),
    primaryPhone: new FormControl(''),
    alternatePhone: new FormControl('')
  });
  constructor(
    private _vendorService: VendorService,
    private _router : Router,
    private _route : ActivatedRoute,
    private _notifierService : NotifierService
    // private _flashMsgService : FlashMessagesService
    ) { }

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    if(id){
      this._vendorService.getVendorById<Vendor>(id).subscribe((data)=>{
        this.vendorForm.get('name').setValue(data.name);
        this.vendorForm.get('gstin').setValue(data.gstin);
        this.vendorForm.get('email').setValue(data.email);
        this.vendorForm.get('pAddressline1').setValue(data.primaryAddress.addressline1);
        this.vendorForm.get('pAddressline2').setValue(data.primaryAddress.addressline2);
        this.vendorForm.get('pCity').setValue(data.primaryAddress.city);
        this.vendorForm.get('pPincode').setValue(data.primaryAddress.pincode);
        this.vendorForm.get('pState').setValue(data.primaryAddress.state);
        this.vendorForm.get('pCountry').setValue(data.primaryAddress.country);
        if(data.alternateAddress){
          this.vendorForm.get('aAddressline1').setValue(data.alternateAddress.addressline1);
          this.vendorForm.get('aAddressline2').setValue(data.alternateAddress.addressline2);
          this.vendorForm.get('aCity').setValue(data.alternateAddress.city);
          this.vendorForm.get('aPincode').setValue(data.alternateAddress.pincode);
          this.vendorForm.get('aState').setValue(data.alternateAddress.state);
          this.vendorForm.get('aCountry').setValue(data.alternateAddress.country);
        }
        this.vendorForm.get('primaryPhone').setValue(data.primaryPhone);
        this.vendorForm.get('alternatePhone').setValue(data.alternatePhone);

      });
    }
  }
  submitVendorForm(){
    const id = this._route.snapshot.paramMap.get('id');
    if(id){
      // console.log('inside submit vendor function call', this.vendorForm.get('name').value);
      const vendor : Vendor = {
        name : this.vendorForm.get('name').value,
        gstin : this.vendorForm.get('gstin').value,
        email : this.vendorForm.get('email').value,
        primaryAddress : {
          addressline1 : this.vendorForm.get('pAddressline1').value,
          addressline2: this.vendorForm.get('pAddressline2').value,
          city : this.vendorForm.get('pCity').value,
          pincode : this.vendorForm.get('pPincode').value,
          state : this.vendorForm.get('pState').value,
          country : this.vendorForm.get('pCountry').value
        },
        alternateAddress : {
          addressline1 : this.vendorForm.get('aAddressline1').value,
          addressline2: this.vendorForm.get('aAddressline2').value,
          city : this.vendorForm.get('aCity').value,
          pincode : this.vendorForm.get('aPincode').value,
          state : this.vendorForm.get('aState').value,
          country : this.vendorForm.get('aCountry').value
        },
        primaryPhone : this.vendorForm.get('primaryPhone').value,
        alternatePhone : this.vendorForm.get('alternatePhone').value
      };
      this._vendorService.editVendor<Vendor>(id, vendor).subscribe(data => {
        this.vendor = data;
      }, error => {
          console.log(error);
         this._notifierService.notify('error', error.error);
      });
      //edit Vendor
    }else{
      const vendor : Vendor = {
        name : this.vendorForm.get('name').value,
        gstin : this.vendorForm.get('gstin').value,
        email : this.vendorForm.get('email').value,
        primaryAddress : {
          addressline1 : this.vendorForm.get('pAddressline1').value,
          addressline2: this.vendorForm.get('pAddressline2').value,
          city : this.vendorForm.get('pCity').value,
          pincode : this.vendorForm.get('pPincode').value,
          state : this.vendorForm.get('pState').value,
          country : this.vendorForm.get('pCountry').value
        },
        alternateAddress : {
          addressline1 : this.vendorForm.get('aAddressline1').value,
          addressline2: this.vendorForm.get('aAddressline2').value,
          city : this.vendorForm.get('aCity').value,
          pincode : this.vendorForm.get('aPincode').value,
          state : this.vendorForm.get('aState').value,
          country : this.vendorForm.get('aCountry').value
        },
        primaryPhone : this.vendorForm.get('primaryPhone').value,
        alternatePhone : this.vendorForm.get('alternatePhone').value
      };
      this._vendorService.createVendor<Vendor>(vendor).subscribe(data => {
        this.vendor = data;
      });
      //createVendor
    }
  }
}