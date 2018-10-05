import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appCourseRelevance]'
})
export class CourseRelevanceDirective {

  @Input('appCourseRelevance') createdDate: string;

  constructor(private el: ElementRef) {
    setTimeout(() => {
      this.changeCourseBorderByRelevance();
    });
  }

  private readonly millisecondsPerSecond: number = 1000;
  private readonly secondsPerMinute: number = 60;
  private readonly minutesPerHour: number = 60;
  private readonly hoursPerDay: number = 24;
  private readonly millisecondsPerDay: number = this.hoursPerDay * this.minutesPerHour * this.secondsPerMinute * this.millisecondsPerSecond;

  private changeCourseBorderByRelevance(): void {
    const currentDate: number = new Date().getTime();
    const createdDate: number = new Date(this.createdDate).getTime();
    const differenceDate: number = Math.trunc(
      (createdDate - currentDate) / (this.millisecondsPerDay)
    );

    if (differenceDate < 0 && differenceDate >= -14) {
      this.el.nativeElement.style.borderColor = 'green';
    } if (differenceDate > 0) {
      this.el.nativeElement.style.borderColor = 'blue';
    }
  }

}
