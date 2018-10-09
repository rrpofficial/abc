import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productform',
  templateUrl: './productform.component.html',
  styleUrls: ['./productform.component.css']
})
export class ProductFormComponent implements OnInit {

  product: {};
  productForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    rate: new FormControl('', Validators.required),
    unit: new FormControl('', Validators.required)
  });
  constructor(
    private _prodService: ProductService,
    private _router: Router,
    private _flashMesgService: FlashMessagesService,
    private _route: ActivatedRoute,
  ) { }

  submitProductForm() {
    console.log('inside submit product form');
    const id = this._route.snapshot.paramMap.get('id');
    console.log('the id is ', id)
    if (!id) {
      // console.log('****** product comp')
      const formVal = this.productForm.value;
      this._prodService.createProduct(formVal.name, formVal.rate, formVal.unit).subscribe((data) => {
        console.log(data['success']);
        if (data['success']) {
          this._flashMesgService.show('Product ' + data['response'].name + ' has been successfully created', { cssClass: 'alert-success', timeout: 3000 });
          this._router.navigate(['products']);
        }
        else {
          this._flashMesgService.show('Unable to create the product', { cssClass: 'alert-danger', timeout: 3000 });
        }

        // if(error){
        //   this._flashMesgService.show(data['message'], {cssClass : 'alert-danger', timeout : 3000});
        // }
      });
    } else {
      const formVal = this.productForm.value;
      console.log('product update comp')
      this._prodService.updateProduct(id, formVal.name, formVal.rate, formVal.unit).subscribe((data) => {
        console.log(data['success']);
        if (data['success']) {
          this._flashMesgService.show('Product ' + data['response'].name + ' has been successfully updated', { cssClass: 'alert-success', timeout: 3000 });
          setTimeout(() => {
            this._router.navigate(['products']);
          }, 3000);
        }
        else {
          this._flashMesgService.show('Unable to create the product', { cssClass: 'alert-danger', timeout: 3000 });
        }

        // if(error){
        //   this._flashMesgService.show(data['message'], {cssClass : 'alert-danger', timeout : 3000});
        // }
      });
    }
  }
  
  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this._prodService.getProductById(id).subscribe((res) => {
        this.product = res['data'];
        const name = res['data'].name;
        const rate = res['data'].rate;
        const unit = res['data'].unit;
        this.productForm.get('name').setValue(name);
        this.productForm.get('rate').setValue(rate);
        this.productForm.get('unit').setValue(unit);
        console.log(name, rate, unit);
      });
    }

  }


}
