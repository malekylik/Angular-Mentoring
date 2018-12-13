import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from 'src/app/models/state.model';
import { Logout } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() logo: string;
  @Input("user-login") userLogin: string;

  constructor(private store: Store<State>) { }

  ngOnInit() {
  }

  logout(): void {
    this.store.dispatch(new Logout());
  }

}
