import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private _http: HttpClient) { }

  getAllVendors(){
    return this._http.get('http://localhost:3000/api/vendors').pipe(map(res => res));
  }
}
