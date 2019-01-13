import { Pipe, PipeTransform } from '@angular/core';

import { dateSeparator } from '../../constants';
import { joinDate } from '../../utils';

@Pipe({
  name: 'fromDMYtoMDYDate'
})
export class FromDMYtoMDYDatePipe implements PipeTransform {

  transform(date: string): string {
    const d: string[] = date.split(dateSeparator);
    return joinDate(d[1], d[0], d[2]);
  }

}
