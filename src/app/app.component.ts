import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { AuthorizationService } from './modules/core/services/authorization/authorization.service';
import { State } from './models/state.model';
import { UserActions } from './store/actions/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  login$: Observable<string>;

  constructor(
    private authorizationService: AuthorizationService,
    private store: Store<State>,
  ) {
    this.login$ = this.store.pipe(select((state: State) => state.user.login));
   }

  ngOnInit() {
    if (this.authorizationService.isAuthenticated()) {
      this.store.dispatch(UserActions.getUserInfo());
    }
  }
}
