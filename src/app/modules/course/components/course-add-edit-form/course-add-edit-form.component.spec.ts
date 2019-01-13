import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SharedModule } from '../../../shared/shared.module';
import { CourseAddEditComponent } from './course-add-edit-form.component';
import { Course } from '../../models/course.model';
import { BaseCourse } from '../../models/base-course';
import { DateInputComponent } from '../date-input/date-input.component';
import { DurationInputComponent } from '../duration-input/duration-input.component';
import { DurationPipe } from '../../pipes/duration/duration.pipe';
import { ValidationService } from 'src/app/modules/core/services/validation/validation.service';
import { AuthorsInputComponent } from '../authors-input/authors-input.component';
import { CoursesService } from '../../services/courses.service';

@Component({
  template: `
    <app-course-add-edit-form [course]="course"></app-course-add-edit-form>
  `,
})
class HostComponent {
  course: Course = BaseCourse.generateCourseWithCurrentDate('', 0, '', []);
}

describe('CourseAddEditComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SharedModule, HttpClientTestingModule],
      declarations: [
        HostComponent,
        CourseAddEditComponent,
        DateInputComponent,
        AuthorsInputComponent,
        DurationInputComponent,
        DurationPipe,
      ],
      providers: [ValidationService, CoursesService],
      // schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
