import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { User } from './models/user/user.model';
import { AuthorizationService } from './modules/core/services/authorization/authorization.service';
import { HttpErrorHandlingService } from './modules/core/services/http-error-handling/http-error-handling.service';
import { State } from './models/state.model';
import { SaveUserInfo } from './store/actions/user.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  login$: Observable<string>;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private authorizationService: AuthorizationService,
    private httpErrorHandlingService: HttpErrorHandlingService,
    private store: Store<State>,
  ) {
    this.login$ = this.store.pipe(select('user', 'login'));
   }

  ngOnInit() {
    if (this.authorizationService.isAuthenticated()) {
      this.getUserInfo();
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private getUserInfo(): void {
    this.authorizationService.getUserInfo()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user: User) => {
        this.store.dispatch(new SaveUserInfo(user));
      },
        error => this.httpErrorHandlingService.handlingError(error));
  }
}
