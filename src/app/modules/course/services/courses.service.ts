import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Course } from '../models/course.model';
import { COURSES_URL } from '../constants/api';
import { coursesListMock } from '../courses-list-mock';

@Injectable()
export class CoursesService {

  private coursesList: Course[] = [];

  constructor(private http: HttpClient) {
    this.coursesList = [...coursesListMock];
  }

  getCourses(start: number = 0, count: number = 15): Observable<Course[]> {
    const config = {
      params: {
        start: String(start),
        count: String(count),
      }
    };

    return this.http.get<Course[]>(COURSES_URL, config);
  }

  getCourse(id: string): Course | null {
    return this.coursesList.find((course) => course.id === id) || null;
  }

  addCourse(course: Course): void {
    this.coursesList = [...this.coursesList, course];
  }

  updateCourse(course: Course): boolean {
    const index = this.coursesList.findIndex((_course) => _course.id === course.id);

    if (index !== -1) {
      this.coursesList[index] = {
        ...course
      };

      return true;
    }

    return false;
  }

  deleteCourse(id: string): void {
    const index = this.coursesList.findIndex((course) => course.id === id);

    if (index !== -1) {
      this.coursesList.splice(index, 1);
    }
  }
}
