import { Injectable } from '@angular/core';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ModalConfirmService {

  constructor(private _productService : ProductService) { }

  remove(type, id){
    if(type === "product"){
      return this._productService.removeProduct(id);
    }
  }
}
