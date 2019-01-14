import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { Course } from '../../models/course.model';
import { DateFormatValidator } from '../../validators/date-format.validator';
import { DateValueValidator } from '../../validators/date-value.validator';
import { DurationValidator } from '../../validators/duration.validator';
import { AuthorsValidator } from '../../validators/authors.validor';
import { ValidationService } from 'src/app/modules/core/services/validation/validation.service';
import { FromDMYtoMDYDatePipe } from '../../pipes/from-dmy-to-mdy-date/from-dmy-to-mdy-date.pipe';
import { joinDate } from '../../utils';
import { maxNameLength, maxDescriptionLength } from '../../constants';

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
  nameControl: FormControl;
  descriptionControl: FormControl;
  dateControl: FormControl;
  lengthControl: FormControl;
  authorsControl: FormControl;

  constructor(
    public validationService: ValidationService,
    private dateNotationPipe: FromDMYtoMDYDatePipe,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  onSave(): void {
    if (this.courseForm.valid) {
      const date: string = this.dateNotationPipe.transform(this.dateControl.value);

      this.course.name = this.nameControl.value;
      this.course.description = this.descriptionControl.value;
      this.course.date = new Date(date).toISOString();
      this.course.length = Number(this.lengthControl.value);
      this.course.authors = this.authorsControl.value;

      this.save.emit(this.course);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  private buildForm(): void {
    const d: Date = new Date(this.course.date);
    const formatedDate: string = joinDate(d.getDate(), d.getMonth() + 1, d.getFullYear());

    this.nameControl = new FormControl(this.course.name, [Validators.required, Validators.maxLength(maxNameLength)]);
    this.descriptionControl = new FormControl(this.course.description, [Validators.required, Validators.maxLength(maxDescriptionLength)]);
    this.dateControl = new FormControl(formatedDate, [Validators.required, DateFormatValidator(), DateValueValidator()]);
    this.lengthControl = new FormControl(this.course.length, [Validators.required, DurationValidator()]);
    this.authorsControl = new FormControl(this.course.authors, [AuthorsValidator()]);

    this.courseForm = new FormGroup({
      name: this.nameControl,
      description: this.descriptionControl,
      date: this.dateControl,
      length: this.lengthControl,
      authors: this.authorsControl,
    });
  }
}
