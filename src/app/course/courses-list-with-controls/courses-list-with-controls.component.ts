import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';

import { Course } from '../course.model';
import { CourseOrderByPipe } from '../course-order-by.pipe';
import { SearchPipe } from '../search.pipe';
import { CoursesService } from '../courses.service';
import { DeleteConfirmationModalComponent } from '../delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-courses-list-with-controls',
  templateUrl: './courses-list-with-controls.component.html',
  styleUrls: ['./courses-list-with-controls.component.css'],
  providers: [
    CourseOrderByPipe,
    SearchPipe,
  ]
})
export class CoursesListWithControlsComponent implements OnInit {

  courses: Course[];
  transformedCourses: Course[];

  constructor(
    public dialog: MatDialog,
    private courseOrderByPipe: CourseOrderByPipe,
    private searchPipe: SearchPipe,
    private coursesService: CoursesService
  ) {
    this.courses = [];
    this.transformedCourses = [];
  }

  ngOnInit() {
    this.courses = this.coursesService.getCourses();
    this.transformedCourses = this.orderByCourses(this.courses);
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

  onDeleteCourse(id: string): void {
    this.openDeleteConfirmationDialog()
    .subscribe((result) => {
      if (result) {
        this.coursesService.deleteCourse(id);
      }
    });
  }

  onLoadMore(): void {
    console.log("LOADING");
  }

  private orderByCourses(courses: Course[]): Course[] {
    return this.courseOrderByPipe.transform(courses);
  }

  private searchCourses(courses: Course[], searchString: string): Course[] {
    return this.searchPipe.transform(courses, searchString);
  }

  private openDeleteConfirmationDialog(): Observable<boolean> {
    const dialogRef = this.dialog.open(DeleteConfirmationModalComponent, {
      maxWidth: '500px',
    });

    return dialogRef.afterClosed();
  }

}
