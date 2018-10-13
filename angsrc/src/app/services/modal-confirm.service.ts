import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { MaterialService } from './material.service';

@Injectable({
  providedIn: 'root'
})
export class ModalConfirmService {

  constructor(
    private _productService : ProductService,
    private _materialService: MaterialService
    ) { }

  remove(type, id){
    if(type === "product"){
      return this._productService.removeProduct(id);
    }
    if(type === "material"){
      return this._materialService.removeMaterial(id);
    }

  }
}
