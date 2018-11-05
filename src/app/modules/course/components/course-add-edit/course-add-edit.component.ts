import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-add-edit',
  templateUrl: './course-add-edit.component.html',
  styleUrls: ['./course-add-edit.component.scss']
})
export class CourseAddEditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSave(): void {
    console.log('saved');
  }

  onCancel(): void {
    console.log('canceled');
  }
}
