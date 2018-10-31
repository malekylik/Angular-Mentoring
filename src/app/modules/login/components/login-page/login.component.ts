import { Component, OnInit } from '@angular/core';

import { AuthorizationService } from '../../../core/services/authorization/authorization.service';
import { BaseUser } from '../../../../models/user/base-user';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginPageComponent implements OnInit {

  firstName: string = "";
  lastName: string = "";

  constructor(
    private authorizationService: AuthorizationService
  ) { }

  ngOnInit() {
  }

  login(): void {
    this.authorizationService.login(BaseUser.generateUser(this.firstName, this.lastName));
    console.log('logged in successfully');
  }
}
