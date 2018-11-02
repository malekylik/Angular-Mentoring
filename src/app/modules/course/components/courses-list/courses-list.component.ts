import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Course } from '../../models/course.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit {

  @Input() courses: Course[];
  @Output() editCourse: EventEmitter<Course> = new EventEmitter();
  @Output() deleteCourse: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onEditCourse(course: Course): void {
    this.editCourse.emit(course);
  }


  onDeleteCourse(id: string): void {
    this.deleteCourse.emit(id);
  }
}
