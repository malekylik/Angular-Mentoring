import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { UserActionTypes, Error as UserError } from '../actions/user.actions';
import { SaveUserInfo } from '../actions/user.actions';
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
                map((user: User) => new SaveUserInfo(user)),
                catchError(error => {
                    this.httpErrorHandlingService.handlingError(error);
                    return of(new UserError(error));
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
