import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CoursesService } from './courses.service';
import { Course } from '../models/course.model';
import { BaseCourse } from '../models/base-course';
import { COURSES_URL } from '../constants/api';

describe('CoursesService', () => {
  const mockCourse: Course = BaseCourse.generateCourseWithCurrentDate('name', 42, 'desc', true);
  const headerName: string = 'Content-Type';
  const headerValue: string = 'application/json';

  let service: CoursesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService]
    });

    service = TestBed.get(CoursesService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: CoursesService = TestBed.get(CoursesService);
    expect(service).toBeTruthy();
  });

  it('getCourse should return an Observable<User>', () => {
    service.getCourse(mockCourse.id).subscribe((course: Course) => {
      expect(course).toEqual(mockCourse);
    });

    const req = httpMock.expectOne(`${COURSES_URL}/${mockCourse.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCourse);
  });

  it('getCourses should return an Observable<Course[]>', () => {
    const mockCourses: Course[] = [
      BaseCourse.generateCourseWithCurrentDate('first', 1, 'firstDesc', false),
      BaseCourse.generateCourseWithCurrentDate('second', 2, 'secondDesc', true),
      BaseCourse.generateCourseWithCurrentDate('third', 3, 'thirdDesc', false),
    ];

    const startParamName: string = 'start';
    const start: number = 4;
    const countParamName: string = 'count';
    const count: number = 12;
    const textFragmentParamName: string = 'textFragment';
    const textFragment: string = 'text';

    service.getCourses(start, count, textFragment).subscribe((courses: Course[]) => {
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne(`${COURSES_URL}?${textFragmentParamName}=${textFragment}&${startParamName}=${start}&${countParamName}=${count}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get(startParamName)).toBe(start.toString());
    expect(req.request.params.get(countParamName)).toBe(count.toString());
    expect(req.request.params.get(textFragmentParamName)).toBe(textFragment);
    req.flush(mockCourses);
  });
  
  it('getCoursesWithParams should use passed params', () => {
    const mockCourses: Course[] = [];

    const firstParamName: string = 'start';
    const first: string = '1';
    const secondParamName = 'second';
    const second: string = '2';
    const thirdParamName: string = 'third';
    const third: string = '3';

    service.getCoursesWithParams({ [firstParamName]: first, [secondParamName]: second, [thirdParamName]: third }).subscribe((courses: Course[]) => {
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne(`${COURSES_URL}?${firstParamName}=${first}&${secondParamName}=${second}&${thirdParamName}=${third}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get(firstParamName)).toBe(first);
    expect(req.request.params.get(secondParamName)).toBe(second);
    expect(req.request.params.get(thirdParamName)).toBe(third);
    req.flush(mockCourses);
  });

  it('addCourse should return an Observable<Course>', () => {
    service.addCourse(mockCourse).subscribe((course: Course) => {
      expect(course).toEqual(mockCourse);
    });

    const req = httpMock.expectOne(COURSES_URL);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get(headerName)).toBe(headerValue);
    expect(req.request.body).toBe(JSON.stringify(mockCourse));
    req.flush(mockCourse);
  });

  it('updateCourse should return an Observable<Course>', () => {
    service.updateCourse(mockCourse).subscribe((course: Course) => {
      expect(course).toEqual(mockCourse);
    });

    const req = httpMock.expectOne(`${COURSES_URL}/${mockCourse.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get(headerName)).toBe(headerValue);
    expect(req.request.body).toBe(JSON.stringify(mockCourse));
    req.flush(mockCourse);
  });

  it('deleteCourse should return an Observable<void>', () => {
    service.deleteCourse(mockCourse.id).subscribe();

    const req = httpMock.expectOne(`${COURSES_URL}/${mockCourse.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockCourse);
  });
});
