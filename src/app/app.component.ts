import { Component } from '@angular/core';

import { User } from './user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User = {
    id: "1",
    firstName: "Maksim",
    lastName: "Kalinouski",
  }

}
