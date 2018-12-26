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

const noop = () => { };

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DurationInputComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input('required') isRequired = false;
  @ViewChild(MatInput) input: MatInput;

  private innerValue: number = 0;
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor(@Optional() @Self() private ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.input.ngControl = this.ngControl;
  }

  get duration(): number {
    return this.innerValue;
  };

  set duration(v: number) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  onBlur() {
    this.onTouchedCallback();
  }

  writeValue(value: number) {
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
