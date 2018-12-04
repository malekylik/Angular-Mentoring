import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from "@angular/router";
import { Observable, Subject } from 'rxjs';
import { takeUntil, filter, flatMap, tap } from 'rxjs/operators';

import { Course } from '../../models/course.model';
import { CourseOrderByPipe } from '../../pipes/course-order-by/course-order-by.pipe';
import { SearchPipe } from '../../pipes/search/search.pipe';
import { CoursesService } from '../../services/courses.service';
import { HttpErrorHandlingService } from '../../../core/services/http-error-handling/http-error-handling.service';
import { LoadingBlockService } from '../../../core/services/loading-block/loading-block.service';
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

  private searchString: string = '';
  private loadCount: number = 15;
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    public dialog: MatDialog,
    private courseOrderByPipe: CourseOrderByPipe,
    private coursesService: CoursesService,
    private router: Router,
    private httpErrorHandlingService: HttpErrorHandlingService,
    private loadingBlockService: LoadingBlockService,
  ) {
    this.courses = [];
    this.transformedCourses = [];
  }

  ngOnInit() {
    this.onLoadMore();
  }

  onSearch(searchString: string): void {
    if (typeof searchString === 'string') {
      if (this.searchString !== searchString) {
        this.searchString = searchString;
        this.courses = [];
      }

      this.loadingBlockService.showLoadingBlock(true);
      this.onLoadMore();
    }
  }

  onAddCourse(): void {
    this.router.navigateByUrl('courses/new');
  }

  onDeleteCourse(id: string): void {
    this.openDeleteConfirmationDialog()
      .pipe(
        filter(result => result),
        flatMap(() => this.coursesService.deleteCourse(id)),
        tap(() => this.loadingBlockService.showLoadingBlock(true)),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(() => {
        this.loadingBlockService.showLoadingBlock(false);
        this.courses = [];
        this.onLoadMore();
      },
        error => this.httpErrorHandlingService.handlingError(error));
  }

  onLoadMore(start: number = this.courses.length, count: number = this.loadCount): void {
    this.coursesService.getCourses(start, count, this.searchString)
      .pipe(
        tap(() => this.loadingBlockService.showLoadingBlock(true)),
        takeUntil(this.unsubscribe$),
      )
      .subscribe((courses: Course[]) => {
        if (courses.length || this.courses.length !== this.transformedCourses.length) {
          this.courses = [...this.courses, ...courses];
          this.transformedCourses = this.orderByCourses(this.courses);
        }

        this.loadingBlockService.showLoadingBlock(false);
      },
        error => this.httpErrorHandlingService.handlingError(error)
      );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private orderByCourses(courses: Course[]): Course[] {
    return this.courseOrderByPipe.transform(courses);
  }

  private openDeleteConfirmationDialog(): Observable<boolean> {
    return this.dialog.open(DeleteConfirmationModalComponent).afterClosed();
  }

}
