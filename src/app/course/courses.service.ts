import { Injectable } from '@angular/core';

import { CourseModule } from './course.module';

@Injectable({
  providedIn: CourseModule
})
export class CoursesService {

  constructor() { }
}
