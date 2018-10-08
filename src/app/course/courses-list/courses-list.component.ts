import { Component, OnInit, Input } from '@angular/core';

import { coursesListMock } from '../courses-list-mock';
import { Course } from '../course.model';
import { CourseOrderByPipe } from '../course-order-by.pipe';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
  providers: [CourseOrderByPipe]
})
export class CoursesListComponent implements OnInit {

  @Input()
  set courses(newCourses: Course[]) {
    if (newCourses != this.prevCourses) {
      this.prevCourses = newCourses;

      this.transformCourses();
    }
  }

  get courses(): Course[] {
    return this.trasformedCourses;
  }

  trasformedCourses: Course[];

  private prevCourses: Course[];

  constructor(private courseOrderByPipe : CourseOrderByPipe) {
    this.prevCourses = [];
    this.trasformedCourses = [];
   }

  ngOnInit() {
  }

  onDeleteCourse(id: string): void {
    console.log(id);
  }  

  private transformCourses(): void {
    this.trasformedCourses = this.courseOrderByPipe.transform(this.prevCourses);
  }
}
