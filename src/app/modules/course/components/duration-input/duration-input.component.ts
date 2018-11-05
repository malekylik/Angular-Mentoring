import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.scss']
})
export class DurationInputComponent implements OnInit {

  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() duration: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
