import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses-list-with-controls',
  templateUrl: './courses-list-with-controls.component.html',
  styleUrls: ['./courses-list-with-controls.component.css']
})
export class CoursesListWithControlsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onLoadMore(): void {
    console.log("LOADING");
  }

}
