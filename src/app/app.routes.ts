import { Routes } from '@angular/router';

import { Page404Component } from './modules/core/components/page404/page404.component';
import { CoursesPageComponent } from './modules/course/components/courses-page/courses-page.component';
import { LoginPageComponent } from './modules/login/components/login-page/login.component';
import { CourseAddEditPageComponent } from './modules/course/components/course-add-edit-page/course-add-edit-page.component';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AuthGuard } from './guards/auth.guard';

const ROUTES: Routes = [
    { path: 'courses', component: CoursesPageComponent, canActivate: [NoAuthGuard] },
    { path: 'auth', component: LoginPageComponent, canActivate: [AuthGuard] },
    { path: 'courses/new', component: CourseAddEditPageComponent, canActivate: [NoAuthGuard] },
    { path: '', pathMatch: 'full', redirectTo: 'courses' },
    { path: '**', component: Page404Component },
];

export {
    ROUTES,
};
