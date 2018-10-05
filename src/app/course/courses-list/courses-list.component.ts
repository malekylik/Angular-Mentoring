import { Component, OnInit } from '@angular/core';

import { coursesListMock } from '../courses-list-mock';
import { Course } from '../course.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
})
export class CoursesListComponent implements OnInit {

  courses: Course[];

  constructor() {
    this.courses = [];
   }

  ngOnInit() {
    this.courses = coursesListMock;
  }

  onDeleteCourse(id: string): void {
    console.log(id);
  }
}
