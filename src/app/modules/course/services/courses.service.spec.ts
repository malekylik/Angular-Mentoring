import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CoursesService } from './courses.service';
import { Course } from '../models/course.model';
import { BaseCourse } from '../models/base-course';
import { COURSES_URL } from '../constants/api';

describe('CoursesService', () => {
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
    const mockCourse: Course = BaseCourse.generateCourseWithCurrentDate(
      'name',
      42,
      'desc',
      true,
    );

    service.getCourse(mockCourse.id).subscribe((course: Course) => {
      expect(course).toEqual(mockCourse);
    });

    const req = httpMock.expectOne(`${COURSES_URL}/${mockCourse.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCourse);
  });
});
