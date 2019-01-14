import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidationService } from 'src/app/modules/core/services/validation/validation.service';

import { BaseUser } from '../../../../models/user/base-user';
import { State } from 'src/app/models/state.model';
import { AuthActions } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  host: { class: 'login' },
  styleUrls: ['./login.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  loginControl: FormControl;
  passwordControl: FormControl;

  constructor(
    private store: Store<State>,
    public validationService: ValidationService,
    ) { }

  ngOnInit() {
    this.loginControl = new FormControl('', [Validators.required]);
    this.passwordControl = new FormControl('', [Validators.required]);

    this.form = new FormGroup({
      login: this.loginControl,
      password: this.passwordControl,
    });
  }

  login(): void {
    if (this.form.valid) {
      const login: string = this.loginControl.value;
      const password: string = this.passwordControl.value;

      this.store.dispatch(AuthActions.login(BaseUser.generateUser('', '', login, password, '')));
    }
  }
}
