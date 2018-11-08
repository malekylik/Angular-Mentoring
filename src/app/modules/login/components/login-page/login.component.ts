import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

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
    private router: Router,
    private authorizationService: AuthorizationService,
  ) { }

  ngOnInit() {
  }

  login(): void {
    this.authorizationService.login(BaseUser.generateUser(this.firstName, this.lastName));
    this.router.navigateByUrl('courses');
  }
}
