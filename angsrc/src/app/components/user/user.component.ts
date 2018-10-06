import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users;
  constructor(private _userService: UserService) { }

  ngOnInit() {
    this._userService.getAllUsers().subscribe(data => this.users = data);
  }

}
