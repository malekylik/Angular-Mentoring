import { Component } from '@angular/core';

import { User } from './user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User = { // Даже для фейка заготовь сразу класс и создавай с помощью класса
    id: "1",
    firstName: "Maksim",
    lastName: "Kalinouski",
  }

}
