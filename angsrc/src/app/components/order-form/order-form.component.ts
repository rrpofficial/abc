import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CustomerService } from '../../services/customer.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  order;
  customers;
  products;

  orderForm: FormGroup;
  constructor(
    private _fb : FormBuilder,
    private _productService: ProductService,
    private _customerService: CustomerService, 
    private _orderService: OrderService
    ) { }

  
  ngOnInit() {

    this.orderForm = this._fb.group({
        customer : ['', Validators.required],
        product : [''],
        orderRecDate : [''],
        orderDate : [''],
        dueDate : [''],
        quantity : [''],
        unit : [''],
        rate:  [''],
        discount :  ['0',Validators.compose([])],
        finalRate :  [''],
        price: [''],
        paymentStatus :  [''],
        payments : this._fb.array([

        ]),
        amountDue: [''],
        amountPaid : ['']
    });

    this._productService.getAllProducts().subscribe((data)=>{
      this.products = data;
    });
    this._customerService.getCustomers().subscribe((data)=>{
      this.customers = data;
    });
    
    //change rate, unit and final Rate when product is changed
    this.orderForm.get('product').valueChanges.subscribe((value)=>{
      const finalRate = value.rate - this.orderForm.get('discount').value;
      this.orderForm.patchValue({
        rate : value.rate,
        unit : value.unit,
        finalRate : finalRate
      });
    });

    //change the orderPrice once quantity is updated...
    this.orderForm.get('quantity').valueChanges.subscribe((value)=>{
      const cOrderPrice = this.orderForm.get('finalRate').value * value;
      console.log('quantity is ---> '+value);
      console.log('order Price is '+cOrderPrice);
      this.orderForm.patchValue({
        price : cOrderPrice
      });
    });

    //change order price and final Rate once discount is updated.
    this.orderForm.get('discount').valueChanges.subscribe((value)=>{
      const finalRate = this.orderForm.get('rate').value - value;
      const cOrderPrice = finalRate * this.orderForm.get('quantity').value;
      // console.log('quantity is ---> '+value);
      // console.log('order Price is '+cOrderPrice);
      this.orderForm.patchValue({
        finalRate : finalRate,
        price : cOrderPrice
      });
    });

    //change due Amount and Paid Amount when there is a change in the order Price
    this.orderForm.get('price').valueChanges.subscribe((value)=>{
      const paid = this.orderForm.get('amountPaid').value || 0;
      const due = value - paid;
      // console.log('quantity is ---> '+value);
      // console.log('order Price is '+cOrderPrice);
      this.orderForm.patchValue({
        amountDue : due,
        amountPaid : paid
      });
    });
  }

  get paymentForms(){
    return this.orderForm.get('payments') as FormArray;
  }
  
 
  addPayment(){
    const payment = this._fb.group({
        amount : [''],
        paymentDate : [''],
        description : ['']
    });
    this.paymentForms.push(payment);
  }

  deletePayment(i){
    this.paymentForms.removeAt(i);
  }

  getUnixTimestamp(dateControlValue){
    const dcVal = dateControlValue;
    const year = dcVal.year;
    const month = dcVal.month;
    const day = dcVal.day;

    const dtime = new Date(year+'-'+month+'-'+day).getTime();
    const timestamp = Math.floor(dtime);
    return timestamp;
  }

  // calculateDueAmount(){
  //   const orderPrice = this.orderForm.get('price').value;
  //   const payments : [] = this.orderForm.get('payments').value;
  //   let paid = 0;
  //   for(let payment of payments){
  //      paid = paid + payment[0];
  //   }
  //   return orderPrice - paid;
  //   console.log('due amount is ', (orderPrice - paid));
  // }
  submitOrderForm(){
    const uOrderRecDate = this.getUnixTimestamp(this.orderForm.get('orderRecDate').value);
    const uOrderDate = this.getUnixTimestamp(this.orderForm.get('orderDate').value);
    const uDueDate = this.getUnixTimestamp(this.orderForm.get('dueDate').value);
    
    const paymentsBody = [];
    let paidAmount = 0;
    this.paymentForms.value.forEach((el, i) => {
      console.log('element is ', el.paymentDate);
      const paymentDate = this.getUnixTimestamp(el.paymentDate);
      paymentsBody.push({'amount' : el.amount, 'description': el.description, 'paymentDate': paymentDate});
    });

    if(paymentsBody.length > 0){
      paymentsBody.forEach(el => {
        paidAmount = paidAmount + Number(el.amount);
      });
    }

    const orderPrice = this.orderForm.get('price').value;
    const dueAmount = Number(orderPrice) - paidAmount;
    


    const order = {
      customer : this.orderForm.get('customer').value,
      product : this.orderForm.get('product').value,
      orderRecDate : uOrderRecDate,
      orderDate : uOrderDate,
      dueDate : uDueDate,
      quantity : this.orderForm.get('quantity').value,
      unit : this.orderForm.get('unit').value,
      rate:  this.orderForm.get('rate').value,
      discount : this.orderForm.get('discount').value,
      finalRate :  this.orderForm.get('finalRate').value,
      price: orderPrice,
      paymentStatus : this.orderForm.get('paymentStatus').value,
      payments : paymentsBody,
      amountDue : dueAmount,
      amountPaid : paidAmount,
    }
    console.log('new payments body is ',paymentsBody);

    this._orderService.createOrder(order).subscribe((data)=>{
      this.order = data;
      console.log(data);
    });
  }
}
