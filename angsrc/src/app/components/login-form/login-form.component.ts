import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent  {
 
  loginForm : FormGroup = new FormGroup(
    {
      email : new FormControl('', Validators.required),
      password : new FormControl('',Validators.required)
    }
  );

  
  constructor(private userService : UserService, private router: Router) { }
  // constructor() { }

  login(){
    const formVal = this.loginForm.value;
    console.log('login from login component');
    // this.userService.userAuthentication('rponnala@vidly.com','Password@1');
    this.userService.userAuthentication(formVal.email, formVal.password)
    .subscribe((result)=>{
      if(result)
        this.router.navigate(['']);
    });
    
  
   }

}
