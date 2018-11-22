import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course.model';
import { BaseCourse } from '../../models/base-course';
import { HttpErrorHandlingService } from '../../../core/services/http-error-handling/http-error-handling.service';

@Component({
  selector: 'app-course-add-edit-page',
  templateUrl: './course-add-edit-page.component.html',
  styleUrls: ['./course-add-edit-page.component.scss']
})
export class CourseAddEditPageComponent implements OnInit, OnDestroy {

  course: Course;

  private id: string | null = null;
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private httpErrorHandlingService: HttpErrorHandlingService,
  ) { }

  ngOnInit() {
    const COURSE_ID: string = 'id';

    this.route.params.subscribe((data) => {
      this.id = data[COURSE_ID] || null;

      if (this.id) {
        this.course = this.coursesService.getCourse(this.id);

        if (!this.course) {
          this.course = BaseCourse.generateCourseWithCurrentDate('', 0, '');
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
      this.coursesService.addCourse(course)
        .pipe(
          takeUntil(this.unsubscribe$),
        )
        .subscribe(
          course => this.router.navigateByUrl('courses'),
          error => this.httpErrorHandlingService.handlingError(error));
    }
  }

  onCancel(): void {
    this.router.navigateByUrl('courses');
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
