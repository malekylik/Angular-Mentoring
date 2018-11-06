import { Routes } from '@angular/router';

import { Page404Component } from './modules/core/components/page404/page404.component';
import { CoursesPageComponent } from './modules/course/components/courses-page/courses-page.component';

const ROUTES: Routes = [
    { path: 'courses', component: CoursesPageComponent },
    { path: '', pathMatch: 'full', redirectTo: 'courses'  },
    { path: '**', component: Page404Component },
];

export {
    ROUTES,
};
