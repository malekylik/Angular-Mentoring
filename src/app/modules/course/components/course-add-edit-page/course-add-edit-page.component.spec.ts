import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CourseAddEditPageComponent } from './course-add-edit-page.component';
import { CoursesService } from '../../services/courses.service';

describe('CourseAddEditPageComponent', () => {
  let component: CourseAddEditPageComponent;
  let fixture: ComponentFixture<CourseAddEditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseAddEditPageComponent],
      providers: [CoursesService],
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
