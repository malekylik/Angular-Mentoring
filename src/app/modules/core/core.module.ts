import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { Page404Component } from './components/page404/page404.component';
import { LoadingBlockComponent } from './components/loading-block/loading-block.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthorizationService } from './services/authorization/authorization.service';
import { HttpErrorHandlingService } from './services/http-error-handling/http-error-handling.service';
import { LoadingBlockService } from './services/loading-block/loading-block.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    Page404Component,
    LoadingBlockComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    Page404Component,
    LoadingBlockComponent,
  ],
  entryComponents: [LoadingBlockComponent],
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
      providers: [
        AuthorizationService,
        HttpErrorHandlingService,
        LoadingBlockService,
        { provide: HTTP_INTERCEPTORS, multi: true, useClass: AuthInterceptor },
      ]
    }
  }
}
