import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private _http: Http) { }

  getAllVendors(){
    return this._http.get('http://localhost:3000/api/vendors').pipe(map(res => res.json()));
  }
}
