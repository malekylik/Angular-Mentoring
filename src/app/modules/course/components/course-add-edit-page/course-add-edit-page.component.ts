import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course.model';
import { BaseCourse } from '../../models/base-course';
import { NOT_FOUND_STATUS } from '../../../../constants/api';
import { HttpErrorHandlingService } from '../../../core/services/http-error-handling/http-error-handling.service';
import { LoadingBlockService } from 'src/app/modules/core/services/loading-block/loading-block.service';

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
    private loadingBlockService: LoadingBlockService,
  ) { }

  ngOnInit() {
    const COURSE_ID: string = 'id';

    this.route.params.subscribe((data) => {
      this.id = data[COURSE_ID] || null;

      if (this.id) {
        this.coursesService.getCourse(this.id)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(
            (course) => {
              this.course = course;
            },
            (error) => {
              if (error.status === NOT_FOUND_STATUS) {
                this.course = BaseCourse.generateCourseWithCurrentDate('', 0, '');
                this.router.navigateByUrl('courses/new');
              } else {
                this.httpErrorHandlingService.handlingError(error)
              }
            });
      } else {
        this.course = BaseCourse.generateCourseWithCurrentDate('', 0, '');
      }
    });
  }

  onSave(course: Course): void {
    let updating$: Observable<Course> = null;

    if (this.id) {
      updating$ = this.coursesService.updateCourse(course);
    } else {
      updating$ = this.coursesService.addCourse(course)
    }

    updating$
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(() => this.loadingBlockService.showLoadingBlock(true)),
      )
      .subscribe(
        course => {
          this.loadingBlockService.showLoadingBlock(false);
          this.router.navigateByUrl('courses')
        },
        error => this.httpErrorHandlingService.handlingError(error),
      );
  }

  onCancel(): void {
    this.router.navigateByUrl('courses');
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
