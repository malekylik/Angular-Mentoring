import { TestBed, async } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { AuthorizationService } from './modules/core/services/authorization/authorization.service';
import { CoursesService } from './modules/course/services/courses.service';
import { HttpErrorHandlingService } from './modules/core/services/http-error-handling/http-error-handling.service';
import { LoadingBlockService } from './modules/core/services/loading-block/loading-block.service';
import { mainReducer } from './store/reducers';
import { AuthEffects } from './store/effects/auth.effects';
import { UserEffects } from './store/effects/user.effects';
import { CoursesEffects } from './store/effects/courses.effects';
import { State } from './models/state.model';
import { UserActions } from './store/actions/user.actions';

describe('AppComponent', () => {
  let valueServiceSpy: jasmine.SpyObj<AuthorizationService>;
  let store: Store<State>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('AuthorizationService', ['isAuthenticated']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        StoreModule.forRoot(mainReducer),
        EffectsModule.forRoot([AuthEffects, UserEffects, CoursesEffects]),
        RouterTestingModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [{ provide: AuthorizationService, useValue: spy }, CoursesService, HttpErrorHandlingService, LoadingBlockService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    valueServiceSpy = TestBed.get(AuthorizationService);
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should dispatch GetUserInfo action if user is authenticated', () => {
    valueServiceSpy.isAuthenticated = jasmine.createSpy('isAuthenticated')
      .and.returnValue(true);

      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();

      const action = UserActions.getUserInfo();

      expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('shouldn\'t dispatch GetUserInfo action if user is not authenticated', () => {
    valueServiceSpy.isAuthenticated = jasmine.createSpy('isAuthenticated')
      .and.returnValue(false);

      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();

      expect(store.dispatch).toHaveBeenCalledTimes(0);
  });
});
