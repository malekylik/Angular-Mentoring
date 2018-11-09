import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

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

  private id: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    ) { }

  ngOnInit() {
    const COURSE_ID: string = 'id';

    this.route.params.subscribe((data) => {
      this.id = data[COURSE_ID] || null;

      if (this.id) {
        this.course = this.coursesService.getCourse(this.id);

        if (!this.course) {
          this.course = new BaseCourse('', '', '', 0, '');
          this.router.navigateByUrl('courses/new');
        }
      } else {
        this.course = BaseCourse.generateCourseWithCurrentDate('', 0, '');
      }
    });
  }

  onSave(course: Course): void {
    if (this.id) {
      this.coursesService.updateCourse(course);
    } else {
      this.coursesService.addCourse(course);
    }

    this.router.navigateByUrl('courses');
  }

  onCancel(): void {
    this.router.navigateByUrl('courses');
  }

}
