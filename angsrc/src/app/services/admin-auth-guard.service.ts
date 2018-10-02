import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  
  constructor(private _userService : UserService) { }

  canActivate(): Observable<boolean>{
    const token = localStorage.getItem('access_token');
    const id = this._userService.getDecodedJwtToken(token)._id;
    console.log('token in Admin guard is '+token);
    console.log('Name in Admin guard is '+this._userService.getDecodedJwtToken(token).name);
    return this._userService.getUserById(id).pipe(map(user => {
     console.log(user);
     return user.isAdmin
    }));
   
  }
}
