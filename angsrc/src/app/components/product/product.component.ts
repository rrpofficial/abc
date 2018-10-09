import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any;

  constructor(private productService: ProductService) {

  }

  ngOnInit() {
    // console.log('inside product component');
    this.productService.getAllProducts().subscribe((data) => {
      // console.log('products', data);
    this.products = data;
    });
  }
}
