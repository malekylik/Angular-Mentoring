import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthorizationService } from '../../../core/services/authorization/authorization.service';
import { HttpErrorHandlingService } from '../../../core/services/http-error-handling/http-error-handling.service';
import { BaseUser } from '../../../../models/user/base-user';
import { Token } from '../../../../models/token.model';
import { LoadingBlockService } from 'src/app/modules/core/services/loading-block/loading-block.service';

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
    private httpErrorHandlingService: HttpErrorHandlingService,
    private loadingBlockService: LoadingBlockService,
  ) { }

  ngOnInit() {
  }

  login(isValid: boolean): void {
    if (isValid) {
      this.subscription = this.authorizationService.login(BaseUser.generateUser('', '', this.userLogin, this.password))
        .pipe(tap(() => this.loadingBlockService.showLoadingBlock(true)))
        .subscribe((token: Token) => {
          this.authorizationService.storeToken(token.token);
          this.loadingBlockService.showLoadingBlock(false);
          this.router.navigateByUrl('courses');
        },
          error => this.httpErrorHandlingService.handlingError(error),
        );
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
