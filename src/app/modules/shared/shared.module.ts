import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BreadcrumbsComponent],
  exports: [    
    BreadcrumbsComponent,
  ]
})
export class SharedModule { }
