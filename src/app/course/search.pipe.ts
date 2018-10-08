import { Pipe, PipeTransform } from '@angular/core';

import { Course } from './course.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(courses: Course[], searchString: string): Course[] {
    const lowerCaseSearchString: string = searchString.toLowerCase();

    return courses.filter(({ title }) => title.toLowerCase().includes(lowerCaseSearchString));
  }

}
