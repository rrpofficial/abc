import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
// import * as jwt_decode from 'jwt-decode';
import { map } from "rxjs/operators";

// import {JwtHelper , tokenNotExpired } from 'angular2-jwt';
import { JwtHelperService } from "@auth0/angular-jwt";
// import { tokenGetter } from '../app.module';
// import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: "root"
})
export class UserService {
  private baseUrl: string = "http://localhost:3000/api";
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) {}

  userAuthentication(email, password) {
    return this.http
      .post(this.baseUrl + "/auth", { email: email, password: password })
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("userDisplayName");
    localStorage.removeItem("userid");
  }

  getDecodedJwtToken(token) {
    try {
      return this.jwtHelper.decodeToken(token);
    } catch (error) {
      return null;
    }
  }

  isLoggedIn() {
    const token = localStorage.getItem("access_token");

    if (!token) return false;
    return !this.jwtHelper.isTokenExpired(token);
  }

  saveUserData(token) {
    localStorage.setItem("access_token", token);
  }

  getUserById(id: string) {
    return this.http
      .get(this.baseUrl + "/users/" + id)
      .pipe(map(response => response));
  }

  getCurrentUser() {
    const token = localStorage.getItem("access_token");
    const decodedToken = this.getDecodedJwtToken(token);
    const user = {
      id: decodedToken._id,
      name: decodedToken.name,
      email: decodedToken.email,
      isAdmin: decodedToken.isAdmin
    };
    return user;
  }
  getAllUsers(){
    return this.http.get(this.baseUrl+'/users').pipe(map(res => res));
  }

  updateUser(id , body){
    const token = localStorage.getItem('access_token');
    if(token){  
      const headers = new HttpHeaders({
        'Content-type' : 'application/json',
        'Authorization' : 'Bearer '+token,
      });
      return this.http.put(this.baseUrl+'/users/'+id,body,{headers : headers}).pipe(map(res=>res));
    }
  }
}