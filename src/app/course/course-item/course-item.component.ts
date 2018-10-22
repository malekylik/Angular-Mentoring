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
  // Неадекватный компонент
  starIcon = faStar;
  classes = {};

  constructor() { }

  ngOnInit() {
    this.classes['courses-list-container_course-item__top-rated'] = this.course.topRated; // Дикая дичь
  }

  onDeleteCourse(): void {
    this.deleteCourse.emit(this.course.id);
  }
}
