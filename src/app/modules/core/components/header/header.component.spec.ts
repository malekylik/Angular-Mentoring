import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule, Store } from '@ngrx/store';
import { MatSnackBarModule } from '@angular/material';

import { HeaderComponent } from './header.component';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { mainReducer } from 'src/app/store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from 'src/app/store/effects/auth.effects';
import { UserEffects } from 'src/app/store/effects/user.effects';
import { CoursesEffects } from 'src/app/store/effects/courses.effects';
import { HttpErrorHandlingService } from '../../services/http-error-handling/http-error-handling.service';
import { LoadingBlockService } from '../../services/loading-block/loading-block.service';
import { CoursesService } from 'src/app/modules/course/services/courses.service';
import { State } from 'src/app/models/state.model';
import { Logout } from 'src/app/store/actions/auth.actions';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: Store<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot(mainReducer),
        EffectsModule.forRoot([AuthEffects, UserEffects, CoursesEffects]),
      ],
      providers: [
        AuthorizationService,
        HttpErrorHandlingService,
        LoadingBlockService,
        CoursesService,
      ],
      declarations: [HeaderComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render passed logo text', () => {
    component.logo = "logo-text";
    fixture.detectChanges();
    
    const logoText = fixture.debugElement.query(By.css('.logo-text'));
    expect(logoText.nativeElement.innerText).toBe(component.logo);
  });

  it('should render passed user login', () => {
    component.userLogin = "user-login";
    fixture.detectChanges();
    
    const logoText = fixture.debugElement.query(By.css('.user-login'));
    expect(logoText.nativeElement.innerText).toBe(component.userLogin);
  });

  it('should dispatch Logout action on logout button', () => {
    component.userLogin = "user-login";
    fixture.detectChanges();

    const logoutButton = fixture.debugElement.query(By.css('.user-managment__user-login-button'));
    logoutButton.triggerEventHandler('click', null);

    const action = new Logout();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
