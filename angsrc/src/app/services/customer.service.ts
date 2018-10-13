import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  fullUrl = environment.baseUrl+'customers/';
  
  constructor(private _http: HttpClient) { }

  getCustomers(){
    return this._http.get(this.fullUrl).pipe(map(response=> response));
  }

  getCustomerById<Customer>(id){
    const token = localStorage.getItem('access_token');
    const headers =  {
      'Content-type' : 'application/json',
      'Authorization' : 'Bearer '+token,
    }
    return this._http.get<Customer>(this.fullUrl+id, { headers : headers}).pipe(map(response => response));
  }

  createCustomer<Customer>(customer : Customer){
    const token = localStorage.getItem('access_token');
    const headers =  {
      'Content-type' : 'application/json',
      'Authorization' : 'Bearer '+token,
    }
    return this._http.post<Customer>(this.fullUrl, customer, { headers : headers}).pipe(map(response => response));
  }
  editCustomer<Customer>(id, customer : Customer){
    const token = localStorage.getItem('access_token');
    // console.log('Token in edit Customer',token);
    const headers =  {
      'Content-type' : 'application/json',
      'Authorization' : 'Bearer '+token,
    }
    return this._http.put<Customer>(this.fullUrl+id, customer, { headers : headers}).pipe(map(response => response));
  }
  deleteCustomer<Customer>(id){
    const token = localStorage.getItem('access_token');
    const headers =  {
      'Content-type' : 'application/json',
      'Authorization' : 'Bearer '+token,
    }
    return this._http.delete<Customer>(this.fullUrl+id, { headers : headers}).pipe(map(response => response));
  }
}

export interface Customer{
    name,
    email,
    gstin,
    primaryPhone,
    secondaryPhone,
    primaryAddress : {
      addressline1,
      addressline2,
      city,
      pincode,
      state,
      country
    },
    alternateAddress : {
      addressline1,
      addressline2,
      city,
      pincode,
      state,
      country
    }
}
