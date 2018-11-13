import { Pipe, PipeTransform } from '@angular/core';
import { minutesPerHour } from '../../constants';

@Pipe({
  name: 'durationPipe'
})
export class DurationPipe implements PipeTransform {

  transform(minutes: number): string {
    const hours: number = Math.floor(minutes / minutesPerHour);
    const restMinutes: number = minutes - hours * minutesPerHour;

    return hours ? `${hours}h ${restMinutes}min` : `${restMinutes}min`;
  }

}
