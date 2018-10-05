import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ToolboxComponent } from './toolbox/toolbox.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { CoursesListWithControlsComponent } from './courses-list-with-controls/courses-list-with-controls.component';
import { CourseRelevanceDirective } from './course-relevance.directive';
import { DurationPipe } from './duration.pipe';
import { CourseOrderByPipe } from './course-order-by.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
  ],
  declarations: [
    ToolboxComponent,
    CoursesListComponent, 
    CourseItemComponent, 
    CoursesListWithControlsComponent,
    CourseRelevanceDirective,
    DurationPipe,
    CourseOrderByPipe,
  ],
  exports: [
    CoursesListWithControlsComponent
  ]
})
export class CourseModule { }
