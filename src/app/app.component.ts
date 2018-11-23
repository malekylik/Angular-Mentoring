import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from './models/user/user.model';
import { AuthorizationService } from './modules/core/services/authorization/authorization.service';
import { HttpErrorHandlingService } from './modules/core/services/http-error-handling/http-error-handling.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  login: string = '';

  private subscription: Subscription = null;

  constructor(
    private authorizationService: AuthorizationService,
    private httpErrorHandlingService: HttpErrorHandlingService,
    ) {}

  ngOnInit() {
    if (this.authorizationService.isAuthenticated()) {
      this.subscription = this.authorizationService.getUserInfo()
      .subscribe((user: User) => {
        this.login = user.login;
      }, 
      error => this.httpErrorHandlingService.handlingError(error));
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
