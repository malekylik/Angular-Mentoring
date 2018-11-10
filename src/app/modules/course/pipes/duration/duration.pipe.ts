import { Pipe, PipeTransform } from '@angular/core';
import { minutesPerHour } from '../../constants';

@Pipe({
  name: 'durationPipe'
})
export class DurationPipe implements PipeTransform {

  transform(minutes: number): string {
    const hours: number = Math.floor(minutes / minutesPerHour);
    const restMinutes: number = minutes - hours * minutesPerHour;

    let duration: string = "";

    if (hours) { // Можно использовать тернарник. Будет чуть короче запись
      duration = `${hours}h ${restMinutes}min`;
    } else {
      duration = `${restMinutes}min`;
    }

    return duration;
  }

}
