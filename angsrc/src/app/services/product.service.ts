import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products;
  constructor(private http: Http) { }
  getAllProducts(){
    this.http.get('http://localhost:3000/api/products').subscribe((response)=>{
    this.products = response;
    return this.products;
    console.log(response);
    })
  }
}
