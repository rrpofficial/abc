import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  user= {};
  userForm : FormGroup = new FormGroup({
    name : new FormControl('', Validators.required),
    email : new FormControl('', Validators.required),
    isAdmin : new FormControl('', Validators.required)
  });
  
  constructor(
    private _userService : UserService,
    private _router: Router,
    private _route : ActivatedRoute,
    ) { }

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    if(id){
      this._userService.getUserById(id).subscribe((data)=>{
        this.user = data;
        this.userForm.get('name').setValue(this.user['name']);
        this.userForm.get('email').setValue(this.user['email']);
        this.userForm.get('isAdmin').setValue(this.user['isAdmin']);
      });}
  }

  submitUserForm(){
    if(this._route.snapshot.paramMap.get('id')){
        const body = {
          name: this.userForm.get('name').value,
          email: this.userForm.get('email').value,
          isAdmin: this.userForm.get('isAdmin').value
         }
         console.log(body);
        //Edit User
    }else{
      //Create User
    }
  }

}
