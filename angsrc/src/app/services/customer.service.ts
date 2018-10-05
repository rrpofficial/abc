import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _http: Http) { }

  getCustomers(){
    return this._http.get('http://localhost:3000/api/customers').pipe(map(response=> response.json()));
  }
}
