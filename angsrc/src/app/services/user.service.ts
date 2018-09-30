import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import * as jwt_decode from 'jwt-decode';

import { map } from 'rxjs/operators';

// import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl : string ='http://localhost:3000/api';
  private authToken : string;
  private userDisplayName : string;
  constructor(private http : Http) { }

  userAuthentication(email, password){
    return this.http.post(this.baseUrl+'/auth', {'email' : email, 'password' : password})
    .pipe(map((response)=>{
      // console.log('token  : '+response.headers.get('x-auth-token'));
      this.authToken = response.headers.get('x-auth-token');
      localStorage.setItem('x-auth-token', 'Bearer '+this.authToken);
      localStorage.setItem('userDisplayName',this.getDecodedJwtToken(response.headers.get('x-auth-token')).name);
      console.log(this.getDecodedJwtToken(response.headers.get('x-auth-token')).name);
      if(this.authToken){
        return true;
      }
      return false;

    }));

    
  }

  logout(){
    localStorage.removeItem('x-auth-token');
    localStorage.removeItem('userDisplayName');
  }

 isUserLoggedIn(): boolean {
    this.authToken = localStorage.getItem('x-auth-token');
    if(this.authToken){
      return true;
    }else{
      return false;
    }
  }

  getDisplayName(){
    this.userDisplayName = localStorage.getItem('userDisplayName');
    if (this.userDisplayName)
      return this.userDisplayName;
    return null;
  }
  getDecodedJwtToken(token : string){
    try {
      return jwt_decode(token);

    }catch(error){
      return null;
    }
  }
}
