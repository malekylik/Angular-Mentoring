import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatChipsModule, MatAutocompleteModule, MatFormFieldModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthorsInputComponent } from './authors-input.component';
import { CoursesService } from '../../services/courses.service';
import { ValidationService } from 'src/app/modules/core/services/validation/validation.service';

describe('AuthorsInputComponent', () => {
  let component: AuthorsInputComponent;
  let fixture: ComponentFixture<AuthorsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatIconModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        HttpClientTestingModule,
      ],
      declarations: [AuthorsInputComponent],
      providers: [
        CoursesService,
        ValidationService,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
