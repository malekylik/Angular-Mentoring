import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-add-edit',
  templateUrl: './course-add-edit.component.html',
  styleUrls: ['./course-add-edit.component.scss']
})
export class CourseAddEditComponent implements OnInit {

  @Input() course: Course;
  @Output() save: EventEmitter<Course> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSave(): void {
    this.save.emit(this.course);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
