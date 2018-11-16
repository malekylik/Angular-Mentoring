import { Component } from '@angular/core';

import { AuthorizationService } from './modules/core/services/authorization/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public authorizationService: AuthorizationService) {}
}
