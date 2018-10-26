import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { HeaderComponent } from './components/header/header.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  declarations: [
    HeaderComponent, 
    BreadcrumbsComponent, 
    FooterComponent,
  ],
  exports: [
    HeaderComponent,
    BreadcrumbsComponent,
    FooterComponent,
  ]
})
export class CoreModule {

}
