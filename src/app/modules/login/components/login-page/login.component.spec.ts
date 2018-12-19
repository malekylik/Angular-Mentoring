import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { LoginPageComponent } from './login.component';
import { AuthorizationService } from '../../../core/services/authorization/authorization.service';
import { HttpErrorHandlingService } from '../../../core/services/http-error-handling/http-error-handling.service'; 
import { LoadingBlockService } from 'src/app/modules/core/services/loading-block/loading-block.service';
import { CoursesService } from 'src/app/modules/course/services/courses.service';
import { mainReducer } from 'src/app/store/reducers';
import { AuthEffects } from 'src/app/store/effects/auth.effects';
import { UserEffects } from 'src/app/store/effects/user.effects';
import { CoursesEffects } from 'src/app/store/effects/courses.effects';

describe('LoginComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        StoreModule.forRoot(mainReducer),
        EffectsModule.forRoot([AuthEffects, UserEffects, CoursesEffects]),
      ],
      declarations: [LoginPageComponent],
      providers: [AuthorizationService, CoursesService, HttpErrorHandlingService, LoadingBlockService],
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
