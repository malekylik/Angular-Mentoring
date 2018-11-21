import { Pipe, PipeTransform } from '@angular/core';

import { Course } from '../../models/course.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(courses: Course[], searchString: string): Course[] {
    const lowerCaseSearchString: string = searchString.toLowerCase();

    return courses.filter(({ name }) => name.toLowerCase().includes(lowerCaseSearchString));
  }

}
