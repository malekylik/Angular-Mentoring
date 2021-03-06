import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { millisecondsPerDay, courseRelevanceTimeInDays } from '../../constants';

@Directive({
  selector: '[appCourseRelevance]'
})
export class CourseRelevanceDirective implements OnChanges {

  @Input('appCourseRelevance') createdDate: string;

  constructor(private el: ElementRef) { }

  ngOnChanges() {
    this.changeCourseBorderByRelevance();
  }

  private changeCourseBorderByRelevance(): void {
    const currentDate: number = new Date().getTime();
    const createdDate: number = new Date(this.createdDate).getTime();
    const differenceDate: number = Math.trunc(
      (createdDate - currentDate) / (millisecondsPerDay)
    );

    if (differenceDate < 0 && differenceDate >= -courseRelevanceTimeInDays) {
      this.el.nativeElement.style.borderColor = 'green';
    } else if (differenceDate > 0) {
      this.el.nativeElement.style.borderColor = 'blue';
    }
  }

}
