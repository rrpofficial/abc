import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders;
  isCollapsed : any ={};
  constructor(private _orderService : OrderService) { }

  ngOnInit() {
    this._orderService.getAllOrders().subscribe(data => {
      this.orders = data;
    }, error => {
        console.log(error.error);
    });
  }

}
