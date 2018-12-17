import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from "@angular/router";
import { Observable, Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { Course } from '../../models/course.model';
import { CourseOrderByPipe } from '../../pipes/course-order-by/course-order-by.pipe';
import { SearchPipe } from '../../pipes/search/search.pipe';
import { HttpErrorHandlingService } from '../../../core/services/http-error-handling/http-error-handling.service';
import { DeleteConfirmationModalComponent } from '../delete-confirmation-modal/delete-confirmation-modal.component';
import { State } from 'src/app/models/state.model';
import { GetCourses, ResetCourses, DeleteCourses } from 'src/app/store/actions/courses.actions';

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

  transformedCourses: Course[];

  private searchString: string = '';
  private loadCount: number = 15;
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    public dialog: MatDialog,
    private courseOrderByPipe: CourseOrderByPipe,
    private router: Router,
    private httpErrorHandlingService: HttpErrorHandlingService,
    private store: Store<State>,
  ) {
    this.transformedCourses = [];
  }

  ngOnInit() {
    this.store.pipe(
      select('courses'),
      takeUntil(this.unsubscribe$),
    ).subscribe((courses: Course[]) => {
      this.transformedCourses = this.orderByCourses(courses);
    });

    this.onLoadMore();
  }

  onSearch(searchString: string): void {
    if (typeof searchString === 'string') {
      if (this.searchString !== searchString) {
        this.searchString = searchString;
        this.store.dispatch(new ResetCourses());
      }

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
        takeUntil(this.unsubscribe$),
      )
      .subscribe(() => {
        this.store.dispatch(new DeleteCourses({
          id,
          coursesReqParams: {
            start: 0,
            count: this.transformedCourses.length,
            textFragment: this.searchString
          }
        }));
      },
        error => this.httpErrorHandlingService.handlingError(error),
      );
  }

  onLoadMore(start: number = this.transformedCourses.length, count: number = this.loadCount): void {
    this.store.dispatch(new GetCourses({ start, count, textFragment: this.searchString }));
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
