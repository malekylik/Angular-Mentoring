import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { Course } from '../../models/course.model';

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

  private readonly maxNameLength: number = 50; 
  private readonly maxDescriptionLength: number = 500; 

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.courseForm = this.fb.group({
      name: [this.course.name, [Validators.required, Validators.maxLength(this.maxNameLength)]],
      description: [this.course.description, [Validators.maxLength(this.maxDescriptionLength)]],
      date: [this.course.date],
      length: [this.course.length],
    });
  }

  get nameControl(): AbstractControl {
    return this.courseForm.get('name');
  }

  get descriptionControl(): AbstractControl {
    return this.courseForm.get('description');
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
