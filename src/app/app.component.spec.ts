import { TestBed, async } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { AuthorizationService } from './modules/core/services/authorization/authorization.service';
import { CoursesService } from './modules/course/services/courses.service';
import { HttpErrorHandlingService } from './modules/core/services/http-error-handling/http-error-handling.service'; 
import { LoadingBlockService } from './modules/core/services/loading-block/loading-block.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      declarations: [
        AppComponent
      ],
      providers: [AuthorizationService, CoursesService, HttpErrorHandlingService, LoadingBlockService],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
