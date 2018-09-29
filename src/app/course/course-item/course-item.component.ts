import { Component, OnInit, Input } from '@angular/core';

import { Course } from '../course.model';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit {

  @Input() course: Course;

  constructor() { }

  ngOnInit() {
  }

  get curseDuration(): string {
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
