import { Pipe, PipeTransform } from '@angular/core';

import { Course } from './course.model';

@Pipe({
  name: 'courseOrderBy'
})
export class CourseOrderByPipe implements PipeTransform {

  transform(courses: Course[]): Course[] {
    return courses.sort((a: Course, b: Course) => new Date(b.creationTime).getTime() - new Date(a.creationTime).getTime());
  }

}
