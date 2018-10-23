import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons'

import { Course } from '../models/course.model';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit {

  @Input() course: Course;
  @Output() deleteCourse: EventEmitter<string> = new EventEmitter();

  starIcon = faStar;

  constructor() { }

  ngOnInit() {
  }

  onDeleteCourse(): void {
    this.deleteCourse.emit(this.course.id);
  }
}
