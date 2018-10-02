import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Output('onLogin') onLogin : EventEmitter<string> = new EventEmitter<string>();
  user;
  constructor(private _userService : UserService) { }

  ngOnInit() {
    this.user = this._userService.getCurrentUser();
    console.log('in Dasboard comp current user is ', this.user);
    this.onLogin.emit(this.user);
  }

}
