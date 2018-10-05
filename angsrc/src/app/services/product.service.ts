import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // products;
  // isCollapsed : true;
  constructor(private http: Http) { }
  getAllProducts(){
    return this.http.get('http://localhost:3000/api/products').pipe(map(response => response.json()))
  }
}
