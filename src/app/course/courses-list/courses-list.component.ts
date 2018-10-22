import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Course } from '../models/course.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
})
export class CoursesListComponent implements OnInit {

  @Input() courses: Course[];
  @Output() deleteCourse: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onDeleteCourse(id: string): void {
    this.deleteCourse.emit(id);
  }
}
