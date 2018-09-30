import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl : string ='http://localhost:3000/api';
  constructor(private http : Http) { }

  userAuthentication(email, password){
    this.http.post('http://localhost:3000/api/auth', {'email' : email, 'password' : password}).subscribe((response)=>{
      // console.log('token  : '+response.headers.get('x-auth-token'));
      localStorage.setItem('x-auth-token', 'Bearer '+response.headers.get('x-auth-token'));
      
    });
  }
}
