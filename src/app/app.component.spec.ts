import { TestBed, async } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { AuthorizationService } from './modules/core/services/authorization/authorization.service';
import { CoursesService } from './modules/course/services/courses.service';
import { HttpErrorHandlingService } from './modules/core/services/http-error-handling/http-error-handling.service';
import { LoadingBlockService } from './modules/core/services/loading-block/loading-block.service';
import { User } from './models/user/user.model';

describe('AppComponent', () => {
  let valueServiceSpy: jasmine.SpyObj<AuthorizationService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('AuthorizationService', ['getAuthStatus', 'getUserInfo']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      declarations: [
        AppComponent
      ],
      providers: [{ provide: AuthorizationService, useValue: spy }, CoursesService, HttpErrorHandlingService, LoadingBlockService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    valueServiceSpy = TestBed.get(AuthorizationService);
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  describe('getAuthStatus', () => {
    it('should subscribe on auth status on init', async(() => {
      valueServiceSpy.getAuthStatus = jasmine.createSpy('getAuthStatus')
      .and.returnValue(of(true));
      valueServiceSpy.getUserInfo = jasmine.createSpy('getUserInfo')
      .and.returnValue(of({}));
  
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
  
      expect(valueServiceSpy.getAuthStatus).toHaveBeenCalledTimes(1);
    }));

    it('should call getUserInfo if user is authenticated', async(() => {
      valueServiceSpy.getAuthStatus = jasmine.createSpy('getAuthStatus')
      .and.returnValue(of(true));
      valueServiceSpy.getUserInfo = jasmine.createSpy('getUserInfo')
      .and.returnValue(of({}));
  
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
  
      expect(valueServiceSpy.getUserInfo).toHaveBeenCalledTimes(1);
    }));

    it('shouldn\'t call getUserInfo if user is not authenticated', async(() => {
      valueServiceSpy.getAuthStatus = jasmine.createSpy('getAuthStatus')
      .and.returnValue(of(false));
  
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
  
      expect(valueServiceSpy.getUserInfo).toHaveBeenCalledTimes(0);
    }));

    it('should unset login if user is not authenticated', async(() => {
      valueServiceSpy.getAuthStatus = jasmine.createSpy('getAuthStatus')
      .and.returnValue(of(false));
  
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();
  
      expect(component.login).toBeNull();
    }));
  });

  describe('getUserInfo', () => {
    it('should set login if user is authenticated', async(() => {
      const userInfo: Partial<User> = { login: 'login' };

      valueServiceSpy.getAuthStatus = jasmine.createSpy('getAuthStatus')
      .and.returnValue(of(true));
      valueServiceSpy.getUserInfo = jasmine.createSpy('getUserInfo')
      .and.returnValue(of(userInfo));
  
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();
  
      expect(component.login).toBe(userInfo.login);
    }));
  });
});
