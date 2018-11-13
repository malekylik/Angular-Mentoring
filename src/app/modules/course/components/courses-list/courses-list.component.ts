import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Course } from '../../models/course.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesListComponent implements OnInit {

  @Input() courses: Course[];
  @Output() deleteCourse: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onDeleteCourse(id: string): void {
    this.deleteCourse.emit(id);
  }
}
