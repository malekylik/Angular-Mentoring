import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { LoginPageComponent } from './components/login-page/login.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    LoginPageComponent
  ],
  exports: [
    LoginPageComponent,
  ]
})
export class LoginModule { }
