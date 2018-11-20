import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module'
import { CourseModule } from './modules/course/course.module';
import { LoginModule } from './modules/login/login.module';
import { ROUTES } from './app.routes';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CourseModule,
    LoginModule,
    CoreModule.forRoot(),
    RouterModule.forRoot(ROUTES),
  ],
  providers: [
    AuthGuard,
    NoAuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
