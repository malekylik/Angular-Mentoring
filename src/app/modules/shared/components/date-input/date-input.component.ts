import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss']
})
export class DateInputComponent implements OnInit {

  @Input() name: string = '';
  @Input() placeholder: string = '';

  constructor() { }

  ngOnInit() {
  }

}
