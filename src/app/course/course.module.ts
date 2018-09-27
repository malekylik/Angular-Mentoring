import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolboxComponent } from './toolbox/toolbox.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseItemComponent } from './course-item/course-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ToolboxComponent, CoursesListComponent, CourseItemComponent]
})
export class CourseModule { }
