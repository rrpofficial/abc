import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers;
  constructor(private _customerService : CustomerService) { 
    
  }
  ngOnInit() {
    this._customerService.getCustomers().subscribe( (data) =>{
      this.customers = data;
      // console.log(`customers : ${JSON.stringify(this.customers)}`);
    });
    
  }
 
}
