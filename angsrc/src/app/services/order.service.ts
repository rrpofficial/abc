import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private _fullUrl = environment.baseUrl+'orders/';
  constructor(private _http : HttpClient) { }

  getAllOrders(){
    return this._http.get(this._fullUrl).pipe(map(response => response));
  }
}
