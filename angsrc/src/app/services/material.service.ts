import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private _http: HttpClient) { }
  
  getAllMaterials(){
    const token = localStorage.getItem('access_token');
    if(token){
      const headers = new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer '+token
      });
    return this._http.get('http://localhost:3000/api/materials/', {headers : headers}).pipe(map(res=> res));
  }
} 
  getMaterialById(id){
    const token = localStorage.getItem('access_token');
    if(token){
      const headers = new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer '+token
      })
    return this._http.get('http://localhost:3000/api/materials/'+id, {headers : headers}).pipe(map(res=> res));
  }
  }
  createMaterial(name, rate, unit){
    const token = localStorage.getItem('access_token');
    if(token){
      const headers = new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer '+token
      });
      const body = {
        name : name,
        rate : rate,
        unit : unit
      }
      return this._http.post('http://localhost:3000/api/materials/', body, {headers : headers}).pipe(map(res => res));
    }
  }
  updateMaterial(id, name, rate, unit){
    const token = localStorage.getItem('access_token');
    if(token){
      const headers = new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer '+token
      })
      const body = {
        name : name,
        rate : rate,
        unit : unit
      }
      return this._http.put('http://localhost:3000/api/materials/'+id, body, { headers : headers}).pipe(map(res=> res));
    }
    
  }
  removeMaterial(id){
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + token
    });
    console.log('*** Material Service method  remove is called for'+id );
    return this._http.delete('http://localhost:3000/api/materials/'+id, {headers : headers}).pipe(map(res=> res));
  }
}
