import { Component, OnInit, Input } from '@angular/core';

import { AuthorizationService } from '../../services/authorization/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() logo: string;
  @Input("user-login") userLogin: string;

  constructor(
    private authorizationService: AuthorizationService
  ) { }

  ngOnInit() {
  }

  logout(): void {
    this.authorizationService.logout();
  }

}
