import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products;
  searchedProducts;

  constructor(private productService: ProductService) {

  }

  ngOnInit() {
    // console.log('inside product component');
    this.productService.getAllProducts().subscribe((data) => {
      // console.log('products', data);
    this.products = data;
    this.searchedProducts = data;
    });
  }

  search(query : string){
   if(query.length >= 3) {
    this.searchedProducts = this.products.filter(
      (product) => {
        return product.name.toLowerCase().includes(query.toLowerCase());
        console.log('product name',product.name);
      });
    // console.log(this.searchedProducts);
    // console.log(query.toLowerCase());
   }else{
     this.searchedProducts = this.products;
   }
  }
}
