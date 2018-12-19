import { Component, OnInit } from '@angular/core';
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
export class LoginPageComponent implements OnInit {
  userLogin: string = "";
  password: string = "";

  constructor(private store: Store<State>) { }

  ngOnInit() {
  }

  login(isValid: boolean): void {
    if (isValid) {
      this.store.dispatch(new Login(BaseUser.generateUser('', '', this.userLogin, this.password, '')));
    }
  }
}
