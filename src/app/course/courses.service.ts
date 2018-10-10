import { Injectable } from '@angular/core';

import { Course } from './course.model';
import { coursesListMock } from './courses-list-mock';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() { }

  getCourses(): Course[] {
    return coursesListMock;
  }
}
