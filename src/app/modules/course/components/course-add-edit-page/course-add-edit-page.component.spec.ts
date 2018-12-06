import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { SharedModule } from '../../../shared/shared.module';
import { CourseAddEditPageComponent } from './course-add-edit-page.component';
import { CoursesService } from '../../services/courses.service';
import { HttpErrorHandlingService } from '../../../core/services/http-error-handling/http-error-handling.service'; 
import { LoadingBlockService } from 'src/app/modules/core/services/loading-block/loading-block.service';

describe('CourseAddEditPageComponent', () => {
  let component: CourseAddEditPageComponent;
  let fixture: ComponentFixture<CourseAddEditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule, HttpClientTestingModule, MatSnackBarModule],
      declarations: [CourseAddEditPageComponent],
      providers: [CoursesService, HttpErrorHandlingService, LoadingBlockService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAddEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
