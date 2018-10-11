import { Injectable } from '@angular/core';

import { Course } from './course.model';
import { coursesListMock } from './courses-list-mock';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private coursesList: Course[] = [];

  constructor() {
    this.coursesList = [...coursesListMock];
  }

  getCourses(): Course[] {
    return this.coursesList;
  }

  getCourse(id: string): Course | null {
    return this.coursesList.find((course) => course.id === id) || null;
  }

  updateCourse(course: Course): boolean {
    const index = this.coursesList.findIndex((_course) => _course.id === course.id);

    if (~index) {
      this.coursesList[index] = {
        ...course
      };

      return true;
    }

    return false;
  }

  deleteCourse(id: string): void {
    const index = this.coursesList.findIndex((course) => course.id === id);

    if (~index) {
      this.coursesList.splice(index, 1);
    }
  }
}
