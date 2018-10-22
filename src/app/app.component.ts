import { Component } from '@angular/core';

import { User } from './models/user/user.model';
import { BaseUser } from './models/user/base-user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User = new BaseUser("1", "Maksim", "Kalinouski");
}
