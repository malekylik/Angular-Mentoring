import { Component, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, SimpleChanges } from '@angular/core';

import { coursesListMock } from '../courses-list-mock';
import { Course } from '../course.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements 
OnChanges, 
OnInit, 
DoCheck,
AfterContentInit, 
AfterContentChecked, 
AfterViewInit, 
AfterViewChecked, 
OnDestroy {

  courses: Course[];

  constructor() {
    this.courses = [];
   }

  ngOnChanges(changes: SimpleChanges) {
    console.log("onChanges");
    console.log(changes);
  }

  ngOnInit() {
    console.log("onInit");
    this.courses = coursesListMock;
  }

  ngDoCheck() {
    console.log("onDoCheck");
  }

  ngAfterContentInit() {
    console.log("afterContentInit");
  }
  
  ngAfterContentChecked() {
    console.log("afterContentChecked");
  }
  
  ngAfterViewInit() {
    console.log("afterViewInit");
  }

  ngAfterViewChecked() {
    console.log("afterViewChecked");
  }

  ngOnDestroy() {
    console.log("onDestroy");
  }

  onDeleteCourse(id: string): void {
    console.log(id);
  }

}
