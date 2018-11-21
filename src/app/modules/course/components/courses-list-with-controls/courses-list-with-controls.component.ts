import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from "@angular/router";
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Course } from '../../models/course.model';
import { CourseOrderByPipe } from '../../pipes/course-order-by/course-order-by.pipe';
import { SearchPipe } from '../../pipes/search/search.pipe';
import { CoursesService } from '../../services/courses.service';
import { HttpErrorHandlingService } from '../../../core/services/http-error-handling/http-error-handling.service';
import { DeleteConfirmationModalComponent } from '../delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-courses-list-with-controls',
  templateUrl: './courses-list-with-controls.component.html',
  styleUrls: ['./courses-list-with-controls.component.scss'],
  providers: [
    CourseOrderByPipe,
    SearchPipe,
  ]
})
export class CoursesListWithControlsComponent implements OnInit, OnDestroy {

  courses: Course[];
  transformedCourses: Course[];
  loading: boolean = false;

  private loadCount: number = 15;
  private unsubscribe$ = new Subject(); 

  constructor(
    public dialog: MatDialog,
    private courseOrderByPipe: CourseOrderByPipe,
    private searchPipe: SearchPipe,
    private coursesService: CoursesService,
    private router: Router,
    private httpErrorHandlingService: HttpErrorHandlingService,
  ) {
    this.courses = [];
    this.transformedCourses = [];
  }

  ngOnInit() {
    this.onLoadMore();
  }

  onSearch(searchString: string): void {
    if (typeof searchString === 'string') {
      if (searchString !== '') {
        this.transformedCourses = this.searchCourses(this.orderByCourses(this.courses), searchString);
      } else {
        this.transformedCourses = this.orderByCourses(this.courses);
      }
    }
  }

  onAddCourse(): void {
    this.router.navigateByUrl('courses/new');    
  }

  onDeleteCourse(id: string): void {
    this.openDeleteConfirmationDialog()
    .subscribe((result) => {
      if (result) {
        this.coursesService.deleteCourse(id);
        this.transformedCourses = [...this.orderByCourses(this.courses)];
      }
    });
  }

  onLoadMore(): void {
    if (!this.loading) {
      this.coursesService.getCourses(this.courses.length, this.loadCount)
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe((courses: Course[]) => {
        if (courses.length) {
          this.courses = [...this.courses, ...courses];
          this.transformedCourses = this.orderByCourses(this.courses);
        }

        this.loading = false;
      },
      error => this.httpErrorHandlingService.handlingError(error));

      this.loading = true;
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private orderByCourses(courses: Course[]): Course[] {
    return this.courseOrderByPipe.transform(courses);
  }

  private searchCourses(courses: Course[], searchString: string): Course[] {
    return this.searchPipe.transform(courses, searchString);
  }

  private openDeleteConfirmationDialog(): Observable<boolean> {
    const dialogRef = this.dialog.open(DeleteConfirmationModalComponent);

    return dialogRef.afterClosed();
  }

}
