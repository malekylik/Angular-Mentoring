import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { UserActionTypes, UserActions } from '../actions/user.actions';
import { AuthorizationService } from '../../modules/core/services/authorization/authorization.service';
import { User } from '../../models/user/user.model';
import { HttpErrorHandlingService } from 'src/app/modules/core/services/http-error-handling/http-error-handling.service';

@Injectable()
export class UserEffects {

    @Effect()
    getUserInfo$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.GetUserInfo),
        mergeMap(() => this.authorizationService.getUserInfo()
            .pipe(
                map((user: User) => UserActions.saveUserInfo(user)),
                catchError(error => {
                    this.httpErrorHandlingService.handlingError(error);
                    return of(UserActions.error(error));
                }),
            )
        ),
    );

    constructor(
        private authorizationService: AuthorizationService,
        private httpErrorHandlingService: HttpErrorHandlingService,
        private actions$: Actions,
    ) { }
}
