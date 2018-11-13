import { Component } from '@angular/core';

import { AuthorizationService } from './modules/core/services/authorization/authorization.service';
import { CoursesService } from './modules/course/services/courses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public authorizationService: AuthorizationService,
    public coursesService: CoursesService,
  ) {}
}
