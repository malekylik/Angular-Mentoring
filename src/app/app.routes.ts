import { Routes } from '@angular/router';

import { Page404Component } from './modules/core/components/page404/page404.component';
import { CoursesPageComponent } from './modules/course/components/courses-page/courses-page.component';
import { LoginPageComponent } from './modules/login/components/login-page/login.component';
import { CourseAddEditPageComponent } from './modules/course/components/course-add-edit-page/course-add-edit-page.component';
import { CoursesListWithControlsComponent } from './modules/course/components/courses-list-with-controls/courses-list-with-controls.component';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AuthGuard } from './guards/auth.guard';

const ROUTES: Routes = [
    { path: 'auth', component: LoginPageComponent, canActivate: [AuthGuard] },
    {
        path: 'courses',
        component: CoursesPageComponent, 
        canActivate: [NoAuthGuard],
        children: [
            { path: '', component: CoursesListWithControlsComponent },
            { path: 'new', component: CourseAddEditPageComponent },
            { path: ':id', component: CourseAddEditPageComponent },
        ]
    },
    { path: '', pathMatch: 'full', redirectTo: 'courses' },
    { path: '**', component: Page404Component },
];

export {
    ROUTES,
};
