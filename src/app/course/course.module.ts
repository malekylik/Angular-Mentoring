import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { ToolboxComponent } from './toolbox/toolbox.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { CoursesListWithControlsComponent } from './courses-list-with-controls/courses-list-with-controls.component';
import { CourseRelevanceDirective } from './course-relevance.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    ToolboxComponent,
    CoursesListComponent, 
    CourseItemComponent, 
    CoursesListWithControlsComponent,
    CourseRelevanceDirective,
  ],
  exports: [
    CoursesListWithControlsComponent
  ]
})
export class CourseModule { }
