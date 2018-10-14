import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService , Customer } from '../../services/customer.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute, Router } from '@angular/router';
import { asTextData } from '@angular/core/src/view';
// import { CustomerComponent } from '../customer/customer.component';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  customer = {};
  customerForm: FormGroup= new FormGroup({
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
    private _customerService : CustomerService,
    private _router : Router,
    private _route : ActivatedRoute,
    private _flashMsgService : FlashMessagesService
  ) { }

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    if(id){
      this._customerService.getCustomerById<Customer>(id).subscribe(data => {
        this.customer = data;
        // console.log(data);
        const name = data.name;
        const email = data.email;
        const gstin = data.gstin;
        const pAddressline1 = data.primaryAddress.addressline1;
        const pAddressline2 = data.primaryAddress.addressline2;
        const pCity = data.primaryAddress.city;
        const pPincode = data.primaryAddress.pincode;
        const pState = data.primaryAddress.state;
        const pCountry = data.primaryAddress.country;
        const aAddressline1 = data.alternateAddress.addressline1;
        const aAddressline2 = data.alternateAddress.addressline2;
        const aCity = data.alternateAddress.city;
        const aPincode = data.alternateAddress.pincode;
        const aState = data.alternateAddress.state;
        const aCountry = data.alternateAddress.country;
        const primaryPhone = data.primaryPhone;
        const alternatePhone = data.alternatePhone;
        
        // console.log('adress '+pAddressline1);
        // console.table(JSON.stringify(data));
        this.customerForm.get('name').setValue(name);
        this.customerForm.get('gstin').setValue(gstin);
        this.customerForm.get('email').setValue(email);
        this.customerForm.get('pAddressline1').setValue(pAddressline1);
        this.customerForm.get('pAddressline2').setValue(pAddressline2);
        this.customerForm.get('pCity').setValue(pCity);
        this.customerForm.get('pPincode').setValue(pPincode);
        this.customerForm.get('pState').setValue(pState);
        this.customerForm.get('pCountry').setValue(pCountry);
        this.customerForm.get('aAddressline1').setValue(aAddressline1);
        this.customerForm.get('aAddressline2').setValue(aAddressline2);
        this.customerForm.get('aCity').setValue(aCity);
        this.customerForm.get('aPincode').setValue(aPincode);
        this.customerForm.get('aState').setValue(aState);
        this.customerForm.get('aCountry').setValue(aCountry);
        this.customerForm.get('primaryPhone').setValue(primaryPhone);
        this.customerForm.get('alternatePhone').setValue(alternatePhone);
      });
      
    }
  }

  submitCustomerForm(){
    const id = this._route.snapshot.paramMap.get('id');
    if(id){
      //Edit Customer 
     const customer : Customer  = {
        name : this.customerForm.get('name').value,
        gstin : this.customerForm.get('gstin').value,
        email : this.customerForm.get('email').value,
        primaryAddress : {
          addressline1 : this.customerForm.get('pAddressline1').value,
          addressline2 : this.customerForm.get('pAddressline2').value,
          city : this.customerForm.get('pCity').value,
          pincode : this.customerForm.get('pPincode').value,
          state : this.customerForm.get('pState').value,
          country : this.customerForm.get('pCountry').value
        },
        alternateAddress : {
          addressline1 : this.customerForm.get('aAddressline1').value,
          addressline2 : this.customerForm.get('aAddressline2').value,
          city : this.customerForm.get('aCity').value,
          pincode : this.customerForm.get('aPincode').value,
          state : this.customerForm.get('aState').value,
          country : this.customerForm.get('aCountry').value
        },
        primaryPhone : this.customerForm.get('primaryPhone').value,
        alternatePhone : this.customerForm.get('alternatePhone').value,
      }

      // console.log('comp form customer ', customer);
      this._customerService.editCustomer<Customer>(id, customer).subscribe((data)=>{
          this.customer = data;
          if(this.customer) {
            this._flashMsgService.show('Customer has been edited', {cssClass : 'alert-success', timeout : 3000});
            this._router.navigate(['customers']);
          }else{
            if(this.customer) {
              this._flashMsgService.show('Customer could not be modified', {cssClass : 'alert-danger', timeout : 3000});
            }
          }
      });
      
    }else{
      //Create customer
      const customer : Customer  = {
        name : this.customerForm.get('name').value,
        gstin : this.customerForm.get('gstin').value,
        email : this.customerForm.get('email').value,
        primaryAddress : {
          addressline1 : this.customerForm.get('pAddressline1').value,
          addressline2 : this.customerForm.get('pAddressline2').value,
          city : this.customerForm.get('pCity').value,
          pincode : this.customerForm.get('pPincode').value,
          state : this.customerForm.get('pState').value,
          country : this.customerForm.get('pCountry').value
        },
        alternateAddress : {
          addressline1 : this.customerForm.get('aAddressline1').value,
          addressline2 : this.customerForm.get('aAddressline2').value,
          city : this.customerForm.get('aCity').value,
          pincode : this.customerForm.get('aPincode').value,
          state : this.customerForm.get('aState').value,
          country : this.customerForm.get('aCountry').value
        },
        primaryPhone : this.customerForm.get('primaryPhone').value,
        alternatePhone : this.customerForm.get('alternatePhone').value,
      }
      this._customerService.createCustomer<Customer>(customer).subscribe((data)=>{
          this.customer = data;
          if(this.customer) {
            this._flashMsgService.show('Customer has been created', {cssClass : 'alert-success', timeout : 3000});
            this._router.navigate(['customers']);
          }else{
            if(this.customer) {
              this._flashMsgService.show('Customer could not be created', {cssClass : 'alert-danger', timeout : 3000});
            }
          }
      });
    }
  }

}
