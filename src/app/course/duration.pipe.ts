import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationPipe'
})
export class DurationPipe implements PipeTransform {

  transform(minutes: number): string {
    const hours: number = Math.floor(minutes / 60); // магическое число
    const restMinutes: number = minutes - hours * 60; // магическое число

    let duration: string = "";

    if (hours != 0) { // можно просто сделать отрицание от часов
      duration = `${hours}h ${restMinutes}min`;
    } else {
      duration = `${restMinutes}min`;
    }

    return duration;
  }

}
