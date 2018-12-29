import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs';
import { Store, Action } from '@ngrx/store';

import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course.model';
import { BaseCourse } from '../../models/base-course';
import { NOT_FOUND_STATUS } from '../../../../constants/api';
import { HttpErrorHandlingService } from '../../../core/services/http-error-handling/http-error-handling.service';
import { State } from 'src/app/models/state.model';
import { AddCourse, EditCourse } from 'src/app/store/actions/courses.actions';

@Component({
  selector: 'app-course-add-edit-page',
  templateUrl: './course-add-edit-page.component.html',
  styleUrls: ['./course-add-edit-page.component.scss']
})
export class CourseAddEditPageComponent implements OnInit, OnDestroy {

  course: Course;

  private id: string | null = null;
  private subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private httpErrorHandlingService: HttpErrorHandlingService,
    private store: Store<State>,
  ) { }

  ngOnInit() {
    const COURSE_ID: string = 'id';

    this.route.params.subscribe((data) => {
      this.id = data[COURSE_ID] || null;

      if (this.id) {
        this.coursesService.getCourse(this.id)
          .subscribe(
            (course) => {
              this.course = new BaseCourse(course.id, course.name, course.date, course.length, course.description, course.authors, course.isTopRated);
            },
            (error) => {
              if (error.status === NOT_FOUND_STATUS) {
                this.course = BaseCourse.generateCourseWithCurrentDate('', 0, '', []);
                this.router.navigateByUrl('courses/new');
              } else {
                this.httpErrorHandlingService.handlingError(error)
              }
            });
      } else {
        this.course = BaseCourse.generateCourseWithCurrentDate('', 0, '', []);
      }
    });
  }

  onSave(course: Course): void {
    let action: Action;

    if (this.id) {
      action = new EditCourse(course);
    } else {
      action = new AddCourse(course);
    }

    this.store.dispatch(action);
  }

  onCancel(): void {
    this.router.navigateByUrl('courses');
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
