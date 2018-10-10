import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // products;
  // isCollapsed : true;
  constructor(private _http: HttpClient) { }
  getAllProducts() {
    return this._http.get('http://localhost:3000/api/products').pipe(map(res => res));
  }
 
  getProductById(id){
    return this._http.get('http://localhost:3000/api/products/'+id).pipe(map(res=>res));
  }
  createProduct(name, rate, unit) {
    const token = localStorage.getItem('access_token');
    const body = {
      "name" : name,
      "rate" : rate,
      "unit" : unit,
    }
    // const authHeader = 'Bearer ' + token;
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this._http.post('http://localhost:3000/api/products', body, { headers: headers})
      .pipe(map(res => res));


  }
  updateProduct(id, name, rate, unit){
    const token = localStorage.getItem('access_token');
    const body = {
      "name" : name,
      "rate" : rate,
      "unit" : unit,
    }
    // const authHeader = 'Bearer ' + token;
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + token
    });
    
    return this._http.put('http://localhost:3000/api/products/'+id, body, { headers: headers})
      .pipe(map(res => res));
  }

  removeProduct(id){
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + token
    });
    console.log('*** Prod Service method  remove is called for'+id );
    return this._http.delete('http://localhost:3000/api/products/'+id, {headers : headers}).pipe(map(res=>res));
  }
}
