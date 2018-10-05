import { Component, OnInit } from '@angular/core';

import { coursesListMock } from '../courses-list-mock';

@Component({
  selector: 'app-courses-list-with-controls',
  templateUrl: './courses-list-with-controls.component.html',
  styleUrls: ['./courses-list-with-controls.component.css']
})
export class CoursesListWithControlsComponent implements OnInit {

  coursesListLength: number = coursesListMock.length;

  constructor() { }

  ngOnInit() {
  }

  onLoadMore(): void {
    console.log("LOADING");
  }

}
