import { Component, OnInit } from '@angular/core';

import { CoursesService } from '../../services/courses/courses.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-add-edit-page',
  templateUrl: './course-add-edit-page.component.html',
  styleUrls: ['./course-add-edit-page.component.scss']
})
export class CourseAddEditPageComponent implements OnInit {

  course: Course;

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    const course: Course | null = this.coursesService.getCourse(this.coursesService.getEditingCourseId());

    if (course) {
      this.course = { ...course };
    }
  }

  onSave(course: Course): void {
    console.log('saved');
    console.log(course);
  }

  onCancel(): void {
    console.log('canceled');
  }

}
