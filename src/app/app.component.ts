import { Component } from '@angular/core';

import { AuthorizationService } from './services/authorization/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private authorizationService: AuthorizationService
  ) {}
}
