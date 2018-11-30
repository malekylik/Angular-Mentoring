import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Course } from '../models/course.model';
import { COURSES_URL } from '../constants/api';
import { Params } from '../../../constants/api';

@Injectable()
export class CoursesService {

  constructor(private http: HttpClient) {
  }

  getCourses(start: number = 0, count: number = 15, textFragment: string = ''): Observable<Course[]> {
    const params: Params = {
      textFragment,
      start: String(start),
      count: String(count),
    };

    return this.getCoursesWithParams(params);
  }

  getCoursesWithParams(params: Params): Observable<Course[]> {
    return this.http.get<Course[]>(COURSES_URL, { params });
  }

  getCourse(id: string): Observable<Course> {
    return this.http.get<Course>(`${COURSES_URL}/${id}`);
  }

  addCourse(course: Course): Observable<Course> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post<Course>(COURSES_URL, JSON.stringify(course), httpOptions);
  }

  updateCourse(course: Course): Observable<Course> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.put<Course>(`${COURSES_URL}/${course.id}`, JSON.stringify(course), httpOptions);
  }

  deleteCourse(id: string): Observable<void> {
    return this.http.delete<void>(`${COURSES_URL}/${id}`);
  }
}
