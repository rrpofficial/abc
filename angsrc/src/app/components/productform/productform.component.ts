import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productform',
  templateUrl: './productform.component.html',
  styleUrls: ['./productform.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm : FormGroup = new FormGroup({
    name : new FormControl('', Validators.required),
    rate : new FormControl('', Validators.required),
    unit : new FormControl('', Validators.required)
  });
  constructor(private _prodService: ProductService, private _route: Router, private _flashMesgService: FlashMessagesService) { }

  createProduct(){
    // console.log('****** product comp')
    const formVal = this.productForm.value;
    this._prodService.createProduct(formVal.name, formVal.rate, formVal.unit).subscribe((data) => {
       console.log(data['success']);
       if(data['success']){
          this._flashMesgService.show('Product '+data['response'].name+' has been successfully created', {cssClass : 'alert-success', timeout : 3000});
          this._route.navigate(['products']);
        }
        else{
          this._flashMesgService.show('Unable to create the product', {cssClass : 'alert-danger', timeout : 3000});
        }

        // if(error){
        //   this._flashMesgService.show(data['message'], {cssClass : 'alert-danger', timeout : 3000});
        // }
    });

    
  }
  ngOnInit() {
  }

}
