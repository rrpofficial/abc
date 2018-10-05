import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _router: Router, private _userService: UserService) { }
  canActivate(){
    if(this._userService.isLoggedIn()) return true;
    this._router.navigate(['']);
    return false;
  }
}
