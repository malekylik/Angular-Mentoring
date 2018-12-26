import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Course } from '../../models/course.model';
import { DateValidator } from '../../validators/date.validator';
import { DurationValidator } from '../../validators/duration.validator';

@Component({
  selector: 'app-course-add-edit',
  templateUrl: './course-add-edit.component.html',
  styleUrls: ['./course-add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseAddEditComponent implements OnInit {

  @Input() course: Course;
  @Output() save: EventEmitter<Course> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  courseForm: FormGroup;

  private static readonly maxNameLength: number = 50; 
  private static readonly maxDescriptionLength: number = 500; 

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.courseForm = this.fb.group({
      name: [this.course.name, [Validators.required, Validators.maxLength(CourseAddEditComponent.maxNameLength)]],
      description: [this.course.description, [Validators.required, Validators.maxLength(CourseAddEditComponent.maxDescriptionLength)]],
      date: [this.course.date, [Validators.required, DateValidator()]],
      length: [this.course.length, [Validators.required, DurationValidator()]],
    });
  }

  onSave(): void {
    if (this.courseForm.valid) {
      this.save.emit(this.course);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
