import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
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
    const logoText = fixture.debugElement.query(By.css('.header_logo-text'));
    component.logo = "logo-text";
    fixture.detectChanges();

    expect(logoText.nativeElement.innerText).toBe(component.logo);
  });

  it('should render passed user login', () => {
    const logoText = fixture.debugElement.query(By.css('.header_user-login'));
    component.userLogin = "user-login";
    fixture.detectChanges();

    expect(logoText.nativeElement.innerText).toBe(component.userLogin);
  });
});
