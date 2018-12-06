import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LoginPageComponent } from './login.component';
import { AuthorizationService } from '../../../core/services/authorization/authorization.service';
import { HttpErrorHandlingService } from '../../../core/services/http-error-handling/http-error-handling.service'; 
import { LoadingBlockService } from 'src/app/modules/core/services/loading-block/loading-block.service';

describe('LoginComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule, MatSnackBarModule],
      declarations: [LoginPageComponent],
      providers: [AuthorizationService, HttpErrorHandlingService, LoadingBlockService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
