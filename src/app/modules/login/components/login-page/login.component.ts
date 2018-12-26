import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ValidationService } from 'src/app/modules/core/services/validation/validation.service';

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

  form: FormGroup;

  constructor(
    private store: Store<State>,
    private fb: FormBuilder,
    public validationService: ValidationService,
    ) { }

  ngOnInit() {
    this.form = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get loginControl(): AbstractControl {
    return this.form.get('login');
  }

  get passwordControl(): AbstractControl {
    return this.form.get('password');
  }

  login(): void {
    if (this.form.valid) {
      const login: string = this.loginControl.value;
      const password: string = this.passwordControl.value;

      this.store.dispatch(new Login(BaseUser.generateUser('', '', login, password, '')));
    }
  }
}
