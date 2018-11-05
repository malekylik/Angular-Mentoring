import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';

import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { DateInputComponent } from './components/date-input/date-input.component';
import { DurationInputComponent } from './components/duration-input/duration-input.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
  ],
  declarations: [BreadcrumbsComponent, DateInputComponent, DurationInputComponent],
  exports: [    
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    BreadcrumbsComponent,
    DateInputComponent,
    DurationInputComponent,
  ]
})
export class SharedModule { }
