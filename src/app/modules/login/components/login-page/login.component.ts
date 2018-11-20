import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';

import { AuthorizationService } from '../../../core/services/authorization/authorization.service';
import { BaseUser } from '../../../../models/user/base-user';
import { Token } from '../../../../models/token.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  host: { class: 'login' },
  styleUrls: ['./login.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  userLogin: string = "";
  password: string = "";

  private subscription: Subscription = null;

  constructor(
    private router: Router,
    private authorizationService: AuthorizationService,
  ) { }

  ngOnInit() {
  }

  login(isValid: boolean): void {
    if (isValid) {
      this.subscription = this.authorizationService.login(BaseUser.generateUser('', '', this.userLogin, this.password))
      .subscribe((token: Token) => {
        this.authorizationService.storeToken(token.token);
        this.router.navigateByUrl('courses');
      });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
