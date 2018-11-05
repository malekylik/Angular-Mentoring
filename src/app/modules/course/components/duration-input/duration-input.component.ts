import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.scss']
})
export class DurationInputComponent implements OnInit {

  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() duration: number = 0;
  @Output() durationChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  changeDuration(duration: number): void {
    this.duration = duration;
    this.durationChange.emit(this.duration);
  }

}
