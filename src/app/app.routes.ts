import { Routes } from '@angular/router';

import { Page404Component } from './modules/core/components/page404/page404.component';
import { CoursesPageComponent } from './modules/course/components/courses-page/courses-page.component';
import { LoginPageComponent } from './modules/login/components/login-page/login.component';
import { CourseAddEditPageComponent } from './modules/course/components/course-add-edit-page/course-add-edit-page.component';
import { CoursesListWithControlsComponent } from './modules/course/components/courses-list-with-controls/courses-list-with-controls.component';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { CourseBreadcrumbResolverService } from './modules/course/services/course-breadcrumb-resolver/course-breadcrumb-resolver.service';

const ROUTES: Routes = [
    { path: 'auth', component: LoginPageComponent, canActivate: [AuthGuard] },
    {
        path: 'courses',
        component: CoursesPageComponent, 
        canActivate: [NoAuthGuard],
        data: { breadcrumb: 'Courses' },
        children: [
            { path: '', component: CoursesListWithControlsComponent, data: { breadcrumb: '' } },
            { path: 'new', component: CourseAddEditPageComponent, data: { breadcrumb: 'New' } },
            { path: ':id', component: CourseAddEditPageComponent, data: { breadcrumb: 'course.title' }, resolve: { course: CourseBreadcrumbResolverService } },
        ]
    },
    { path: '', pathMatch: 'full', redirectTo: 'courses' },
    { path: '**', component: Page404Component },
];

export {
    ROUTES,
};
