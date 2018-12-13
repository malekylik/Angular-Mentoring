import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { BaseUser } from '../../../../models/user/base-user';
import { State } from 'src/app/models/state.model';
import { Login } from 'src/app/store/actions/auth.actions';

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

  constructor(private store: Store<State>) { }

  ngOnInit() {
  }

  login(isValid: boolean): void {
    if (isValid) {
      this.store.dispatch(new Login(BaseUser.generateUser('', '', this.userLogin, this.password, '')));
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
