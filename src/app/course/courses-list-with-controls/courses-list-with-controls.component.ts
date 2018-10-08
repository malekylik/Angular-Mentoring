import { Component, OnInit } from '@angular/core';

import { coursesListMock } from '../courses-list-mock';
import { Course } from '../course.model';

@Component({
  selector: 'app-courses-list-with-controls',
  templateUrl: './courses-list-with-controls.component.html',
  styleUrls: ['./courses-list-with-controls.component.css']
})
export class CoursesListWithControlsComponent implements OnInit {

  courses: Course[];

  constructor() { 
    this.courses = [];
  }

  ngOnInit() {
    this.courses = coursesListMock;
  }

  onLoadMore(): void {
    console.log("LOADING");
  }

}
