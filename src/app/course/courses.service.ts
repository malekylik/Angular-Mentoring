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

  addCourse(title: string, duration: number, description: string, topRated: boolean = false): void {
    const maxId: string = this.coursesList.reduce((prev, current) => {
      if (Number(prev) < Number(current.id)) {
        return current.id;
      }

      return prev;
    }, "-1");
    
    const nowDate: Date = new Date();

    let idForNewCourse: string;

    if (~maxId) {
      idForNewCourse = String(Number(maxId) + 1);
    } else {
      idForNewCourse = "1"
    }

    const newCourse: Course = {
      id: idForNewCourse,
      creationTime: `${nowDate.getMonth() + 1}.${nowDate.getDate()}.${nowDate.getFullYear()}`,
      title,
      duration,
      description,
      topRated,
    };

    this.coursesList = [...this.coursesList, newCourse];
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
