import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss']
})
export class DateInputComponent implements OnInit {

  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() date: string = '';
  @Output() dateChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  changeDate(date: string): void {
    this.date = date;
    this.dateChange.emit(date);
  }

}
