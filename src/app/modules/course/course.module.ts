import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolboxComponent } from './components/toolbox/toolbox.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CourseItemComponent } from './components/course-item/course-item.component';
import { CoursesListWithControlsComponent } from './components/courses-list-with-controls/courses-list-with-controls.component';
import { DeleteConfirmationModalComponent } from './components/delete-confirmation-modal/delete-confirmation-modal.component';
import { CourseRelevanceDirective } from './directives/course-relevance/course-relevance.directive';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import { SharedModule } from '../shared/shared.module';
import { CourseAddEditPageComponent } from './components/course-add-edit-page/course-add-edit-page.component';
import { CourseAddEditComponent } from './components/course-add-edit-form/course-add-edit-form.component';
import { DateInputComponent } from './components/date-input/date-input.component';
import { DurationInputComponent } from './components/duration-input/duration-input.component';
import { DurationPipe } from './pipes/duration/duration.pipe';
import { CourseOrderByPipe } from './pipes/course-order-by/course-order-by.pipe';
import { SearchPipe } from './pipes/search/search.pipe';
import { CoursesService } from './services/courses.service';
import { CourseBreadcrumbResolverService } from './services/course-breadcrumb-resolver/course-breadcrumb-resolver.service';
import { AuthorsInputComponent } from './components/authors-input/authors-input.component';
import { FromDMYtoMDYDatePipe } from './pipes/from-dmy-to-mdy-date/from-dmy-to-mdy-date.pipe';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    ToolboxComponent,
    CoursesListComponent,
    CourseItemComponent,
    CoursesListWithControlsComponent,
    CourseRelevanceDirective,
    DurationPipe,
    CourseOrderByPipe,
    SearchPipe,
    DeleteConfirmationModalComponent,
    CoursesPageComponent,
    CourseAddEditPageComponent,
    CourseAddEditComponent,
    DateInputComponent,
    DurationInputComponent,
    AuthorsInputComponent,
    FromDMYtoMDYDatePipe,
  ],
  providers: [
    CoursesService, 
    CourseBreadcrumbResolverService,
  ],
  entryComponents: [
    DeleteConfirmationModalComponent
  ],
  exports: [
    CoursesPageComponent,
    CourseAddEditPageComponent,
  ]
})
export class CourseModule { }
