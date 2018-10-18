import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CustomerService } from '../../services/customer.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  order = {};
  customers;
  products;

  orderForm: FormGroup= new FormGroup({
      customer : new FormControl('', Validators.required),
      product : new FormControl(''),
      orderRecDate : new FormControl(''),
      orderDate : new FormControl(''),
      dueDate : new FormControl(''),
      quantity : new FormControl(''),
      unit : new FormControl(''),
      rate:  new FormControl(''),
      discount :  new FormControl(''),
      finalRate :  new FormControl(''),
      price: new FormControl(''),
      paymentStatus :  new FormControl(''),
      payments : new FormControl(''),
      // aCity: new FormControl(''),
      // aPincode: new FormControl(''),
      // aState: new FormControl(''),
      // aCountry: new FormControl(''),
      // primaryPhone: new FormControl(''),
      // alternatePhone: new FormControl('')
    });
  constructor(private _productService: ProductService, private _customerService: CustomerService, private _orderService: OrderService) { }

  ngOnInit() {
    this._productService.getAllProducts().subscribe((data)=>{
      this.products = data;
    });
    this._customerService.getCustomers().subscribe((data)=>{
      this.customers = data;
    });
  }

}
