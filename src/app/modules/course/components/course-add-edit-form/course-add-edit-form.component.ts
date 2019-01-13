import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { Course } from '../../models/course.model';
import { DateFormatValidator } from '../../validators/date-format.validator';
import { DateValueValidator } from '../../validators/date-value.validator';
import { DurationValidator } from '../../validators/duration.validator';
import { AuthorsValidator } from '../../validators/authors.validor';
import { ValidationService } from 'src/app/modules/core/services/validation/validation.service';
import { FromDMYtoMDYDatePipe } from '../../pipes/from-dmy-to-mdy-date/from-dmy-to-mdy-date.pipe';
import { joinDate } from '../../utils';

@Component({
  selector: 'app-course-add-edit-form',
  templateUrl: './course-add-edit-form.component.html',
  styleUrls: ['./course-add-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FromDMYtoMDYDatePipe],
})
export class CourseAddEditComponent implements OnInit {

  @Input() course: Course;
  @Output() save: EventEmitter<Course> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  courseForm: FormGroup;

  private static readonly maxNameLength: number = 50;
  private static readonly maxDescriptionLength: number = 500;

  constructor(
    public validationService: ValidationService,
    private fb: FormBuilder,
    private dateNotationPipe: FromDMYtoMDYDatePipe,
  ) { }

  ngOnInit() {
    const d: Date = new Date(this.course.date);
    const formatedDate: string = joinDate(d.getDate(), d.getMonth() + 1, d.getFullYear());

    this.courseForm = this.fb.group({
      name: [this.course.name, [Validators.required, Validators.maxLength(CourseAddEditComponent.maxNameLength)]],
      description: [this.course.description, [Validators.required, Validators.maxLength(CourseAddEditComponent.maxDescriptionLength)]],
      date: [formatedDate, [Validators.required, DateFormatValidator(), DateValueValidator()]],
      length: [this.course.length, [Validators.required, DurationValidator()]],
      authors: [this.course.authors, [AuthorsValidator()]],
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
      const date: string = this.dateNotationPipe.transform(this.courseForm.get('date').value);

      this.course.name = this.nameControl.value;
      this.course.description = this.descriptionControl.value;
      this.course.date = new Date(date).toISOString();
      this.course.length = Number(this.courseForm.get('length').value);
      this.course.authors = this.courseForm.get('authors').value;

      this.save.emit(this.course);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
