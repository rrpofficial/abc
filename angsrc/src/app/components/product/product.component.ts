import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products : any;
  
  constructor(private productService: ProductService) { 
    console.log('inside product component');
   this.productService.getAllProducts().subscribe((data)=>{
    console.log('products',data);
    this.products = data;
   });
  }
  // getProducts(){
  //   this.products = this.productService.getAllProducts();
  //   console.log(this.products);
  // }
  // console.log(this.productService.getAllProducts());
  ngOnInit() {
    
  }

}
