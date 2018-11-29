import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HeaderComponent } from './header.component';
import { AuthorizationService } from '../../services/authorization/authorization.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthorizationService],
      declarations: [HeaderComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
});
