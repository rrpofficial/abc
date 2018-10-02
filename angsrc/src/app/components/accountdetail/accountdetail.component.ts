import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-accountdetail',
  templateUrl: './accountdetail.component.html',
  styleUrls: ['./accountdetail.component.css']
})
export class AccountdetailComponent implements OnInit {
  accountDetails;
  constructor(private _userService : UserService) { 
    this.accountDetails = this._userService.getCurrentUser();
  }

  ngOnInit() {
  }

}
