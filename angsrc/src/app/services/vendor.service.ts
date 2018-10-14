import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VendorService {
  fullUrl = environment.baseUrl+'vendors/'
  constructor(private _http: HttpClient) { }

  getAllVendors(){
    return this._http.get(this.fullUrl).pipe(map(res => res));
  }
  getVendorById<Vendor>(id){
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Content-type' : 'applciation/json',
      'Authorization' : 'Bearer '+token
    });
    return this._http.get<Vendor>(this.fullUrl+id, {headers : headers}).pipe(map(res => res));
  }
  createVendor<Vendor>(vendor : Vendor){
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Content-type' : 'application/json',
      'Authorization' : 'Bearer '+token
    });
    return this._http.post<Vendor>(this.fullUrl, vendor, {headers : headers}).pipe(map(res => res));
  }
  editVendor<Vendor>(id, vendor : Vendor){
    const token = localStorage.getItem('access_token');
    const headers = {
      'Content-type' : 'application/json',
      'Authorization' : 'Bearer '+token
    };
    return this._http.put<Vendor>(this.fullUrl+id, vendor, { headers : headers}).pipe(map(res => res));
  }
  deleteVendor<Vendor>(id){
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Content-type' : 'applciation/json',
      'Authorization' : 'Bearer '+token
    });
    return this._http.delete<Vendor>(this.fullUrl+id, {headers : headers}).pipe(map(res => res));
  }
}

export interface Vendor{
  name,
  email,
  gstin,
  primaryPhone,
  alternatePhone,
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
