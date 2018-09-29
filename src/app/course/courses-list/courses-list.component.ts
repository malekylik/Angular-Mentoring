import { Component, OnInit } from '@angular/core';

import { coursesListMock } from '../courses-list-mock';
import { Course } from '../course.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  courses: Course[] = coursesListMock;

  constructor() { }

  ngOnInit() {
  }

}
