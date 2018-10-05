import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons'

import { Course } from '../course.model';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit {

  @Input() course: Course;
  @Output() deleteCourse: EventEmitter<string> = new EventEmitter();

  starIcon = faStar;
  classes = {};

  constructor() { }

  ngOnInit() {
    this.classes['courses-list-container_course-item__top-rated'] = this.course.topRated;
  }

  onDeleteCourse(): void {
    this.deleteCourse.emit(this.course.id);
  }

  get courseDuration(): string {
    const hours: number = Math.floor(this.course.duration / 60);
    const minutes: number = this.course.duration - hours * 60;

    let duration: string = "";

    if (hours != 0) {
      duration = `${hours}h ${minutes}min`;
    } else {
      duration = `${minutes}min`;
    }

    return duration;
  }
}
