import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { CoursesService } from '../../services/courses/courses.service';
import { Course } from '../../models/course.model';
import { BaseCourse } from '../../models/base-course';

@Component({
  selector: 'app-course-add-edit-page',
  templateUrl: './course-add-edit-page.component.html',
  styleUrls: ['./course-add-edit-page.component.scss']
})
export class CourseAddEditPageComponent implements OnInit {

  course: Course;

  constructor(
    private router: Router,
    private coursesService: CoursesService,
    ) { }

  ngOnInit() {
    this.course = BaseCourse.generateCourseWithCurrentDate('', 0, '');
  }

  onSave(course: Course): void {
    this.coursesService.addCourse(course);
    this.router.navigateByUrl('courses');
  }

  onCancel(): void {
    this.router.navigateByUrl('courses');
  }

}
