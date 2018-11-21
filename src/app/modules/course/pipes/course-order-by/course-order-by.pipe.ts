import { Pipe, PipeTransform } from '@angular/core';

import { Course } from '../../models/course.model';

@Pipe({
  name: 'courseOrderBy'
})
export class CourseOrderByPipe implements PipeTransform {

  transform(courses: Course[]): Course[] {
    return courses.sort((a: Course, b: Course) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

}
