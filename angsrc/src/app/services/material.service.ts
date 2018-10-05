import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private _http: Http) { }
  
  getAllMaterials(){
    return this._http.get('http://localhost:3000/api/materials').pipe(map(res=> res.json()));
  }
}
