import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import { LoginPageComponent } from './components/login-page/login.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
  ],
  declarations: [
    LoginPageComponent
  ],
  exports: [
    LoginPageComponent,
  ]
})
export class LoginModule { }
