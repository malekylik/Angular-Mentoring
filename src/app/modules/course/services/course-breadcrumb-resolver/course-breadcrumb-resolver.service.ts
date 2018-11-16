import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { CoursesService } from '../courses.service';
import { Course } from '../../models/course.model';

@Injectable()
export class CourseBreadcrumbResolverService implements Resolve<Course> {

  constructor(private coursesService: CoursesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> | Promise<Course> | Course {
    const courseIdParam: string = 'id';
    return this.coursesService.getCourse(route.paramMap.get(courseIdParam));
  }
}
