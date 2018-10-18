import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appCourseRelevance]'
})
export class CourseRelevanceDirective implements OnChanges {

  @Input('appCourseRelevance') createdDate: string;

  private readonly millisecondsPerSecond: number = 1000; // Используй константы
  private readonly secondsPerMinute: number = 60; // Используй константы
  private readonly minutesPerHour: number = 60; // Используй константы
  private readonly hoursPerDay: number = 24; // Используй константы
  private readonly millisecondsPerDay: number = this.hoursPerDay * this.minutesPerHour * this.secondsPerMinute * this.millisecondsPerSecond;

  constructor(private el: ElementRef) { }

  ngOnChanges() {
    this.changeCourseBorderByRelevance();
  }

  private changeCourseBorderByRelevance(): void {
    const currentDate: number = new Date().getTime();
    const createdDate: number = new Date(this.createdDate).getTime();
    const differenceDate: number = Math.trunc(
      (createdDate - currentDate) / (this.millisecondsPerDay)
    );

    if (differenceDate < 0 && differenceDate >= -14) { // Магическое число
      this.el.nativeElement.style.borderColor = 'green';
    } if (differenceDate > 0) {
      this.el.nativeElement.style.borderColor = 'blue';
    }
  }

}
