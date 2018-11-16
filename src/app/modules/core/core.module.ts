import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthorizationService } from './services/authorization/authorization.service';
import { Page404Component } from './components/page404/page404.component';
import { BreadcrumbsService } from './services/breadcrumbs/breadcrumbs.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    Page404Component,
  ],
  providers: [BreadcrumbsService],
  exports: [
    HeaderComponent,
    FooterComponent,
    Page404Component,
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [ AuthorizationService ]
    }
  }
}
