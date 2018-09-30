import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent  {
 
  loginForm = new FormGroup(
    {
      email : new FormControl('', Validators.required),
      password : new FormControl('',Validators.required)
    }
  );
  constructor(private userService : UserService) { }
  // constructor() { }

  login(){
    console.log('login from login component');
    this.userService.userAuthentication('rponnala@vidly.com','Password@1');
    
  }
}
