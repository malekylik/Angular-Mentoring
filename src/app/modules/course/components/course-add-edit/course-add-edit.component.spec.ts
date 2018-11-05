import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CourseAddEditComponent } from './course-add-edit.component';
import { Course } from '../../models/course.model';
import { BaseCourse } from '../../models/base-course';

@Component({
  template: `
    <app-course-add-edit [course]="course"></app-course-add-edit>
  `,
})
class HostComponent {
  course: Course = BaseCourse.generateCourseWithCurrentDate('', 0, '');
}

describe('CourseAddEditComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HostComponent, CourseAddEditComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
