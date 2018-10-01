import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
// import * as jwt_decode from 'jwt-decode';
import { map } from 'rxjs/operators';

// import {JwtHelper , tokenNotExpired } from 'angular2-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';
// import { tokenGetter } from '../app.module';
// import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private userDisplayName : string;
  private baseUrl : string ='http://localhost:3000/api';
  jwtHelper : JwtHelperService = new JwtHelperService();
 
  constructor(private http : Http) { 
    
  }

  userAuthentication(email, password){
    return this.http.post(this.baseUrl+'/auth', {'email' : email, 'password' : password})
    .pipe(map(response => response.json()));
  }

  logout(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('userDisplayName');
    localStorage.removeItem('userid');
  }

//  isUserLoggedIn(): boolean {
//     this.authToken = localStorage.getItem('x-auth-token');
//     if(this.authToken){
//       return true;
//     }else{
//       return false;
//     }
//   }


  // getDisplayName(){
  //   this.userDisplayName = localStorage.getItem('userDisplayName');
  //   if (this.userDisplayName)
  //     return this.userDisplayName;
  //   return null;
  // }
  getName(){
    return localStorage.getItem('userDisplayName');
  }
  getDecodedJwtToken(token : string){
    try {
      return this.jwtHelper.decodeToken(token);

    }catch(error){
      return null;
    }
  }

  isLoggedIn(){
    const token = localStorage.getItem('access_token');
    
    if (!token) return false;
    return (!this.jwtHelper.isTokenExpired(token));
   
  }

  saveUserData(token){
    localStorage.setItem('access_token', token);
    localStorage.setItem('userDisplayName',this.getDecodedJwtToken(token).name);
    localStorage.setItem('userid', this.getDecodedJwtToken(token)._id);
  }


}
