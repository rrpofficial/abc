import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products;
  
  constructor(private productService: ProductService) { 
    console.log('inside product component');
    this.products = this.productService.getAllProducts();
  }
  // getProducts(){
  //   this.products = this.productService.getAllProducts();
  //   console.log(this.products);
  // }
  // console.log(this.productService.getAllProducts());
  ngOnInit() {
    
  }

}
