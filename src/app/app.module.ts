import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module'
import { CourseModule } from './modules/course/course.module';
import { LoginModule } from './modules/login/login.module';
import { AuthorizationService } from './services/authorization/authorization.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    CourseModule,
    LoginModule,
  ],
  providers: [
    AuthorizationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
