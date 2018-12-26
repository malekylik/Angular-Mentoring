import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Self,
  Optional,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatInput } from '@angular/material';
import { ValidationService } from 'src/app/modules/core/services/validation/validation.service';

const noop = () => { };

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateInputComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  @Input() name: string = '';
  @Input('required') isRequired = false;
  @Input() placeholder: string = '';
  @ViewChild(MatInput) input: MatInput;

  private innerValue: string = '';
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    public validationService: ValidationService,
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.input.ngControl = this.ngControl;
  }

  get date(): string {
    return this.innerValue;
  };

  set date(v: string) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  onBlur() {
    this.onTouchedCallback();
  }

  writeValue(value: string) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }
}
