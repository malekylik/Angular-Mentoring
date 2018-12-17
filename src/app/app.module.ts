import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module'
import { CourseModule } from './modules/course/course.module';
import { LoginModule } from './modules/login/login.module';
import { ROUTES } from './app.routes';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { mainReducer } from './store/reducers';
import { AuthEffects } from './store/effects/auth.effects';
import { UserEffects } from './store/effects/user.effects';
import { CoursesEffects } from './store/effects/courses.effects';


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
    StoreModule.forRoot(mainReducer),
    EffectsModule.forRoot([AuthEffects, UserEffects, CoursesEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 10 }),
  ],
  providers: [
    AuthGuard,
    NoAuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
