import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  user: any;

  
  
  constructor(private _userService : UserService, private _router: Router) {
    
   }

  ngOnInit() {
    
  }

  get userObj(){
    if (this._userService.getCurrentUser) {
          this.user = this._userService.getCurrentUser();
          // console.log('in User Obj and user is ',this.user.name );
          return this.user;

        } 
  }
  
  logout(){
    this._userService.logout();
    this._router.navigate(['']);
  }

}
