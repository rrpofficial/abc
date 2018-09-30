import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  userDisplayName : string; 
  
  
  
  constructor(private userService : UserService, private router: Router) {
   
   }

  ngOnInit() {
    this.isLoggedIn = this.userService.isUserLoggedIn();
    this.userDisplayName = this.userService.getDisplayName();
  }
  logout(){
    this.userService.logout();
    this.router.navigate['/']
  }

}
