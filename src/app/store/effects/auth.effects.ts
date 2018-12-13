import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, tap, map, catchError, switchMap, finalize } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

import { AuthActionTypes, Login, SaveUserInfo, Error } from '../actions/auth.actions';
import { AuthorizationService } from '../../modules/core/services/authorization/authorization.service';
import { Token } from '../../models/token.model';
import { User } from '../../models/user/user.model';
import { LoadingBlockService } from 'src/app/modules/core/services/loading-block/loading-block.service';
import { HttpErrorHandlingService } from 'src/app/modules/core/services/http-error-handling/http-error-handling.service';

@Injectable()
export class AuthEffects {

    @Effect()
    login$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.Login),
        tap(() => this.loadingBlockService.showLoadingBlock(true)),
        switchMap((action: Login) => this.authorizationService.login(action.payload)
            .pipe(
                tap((token: Token) => this.authorizationService.storeToken(token.token)),
                mergeMap(() => this.authorizationService.getUserInfo()),
                tap(() => this.router.navigateByUrl('courses')),
                map((user: User) => new SaveUserInfo(user)),
                catchError(error => {
                    this.httpErrorHandlingService.handlingError(error);
                    return of(new Error());
                }),
                finalize(() => this.loadingBlockService.showLoadingBlock(false)),
            )
        ),
    );

    constructor(
        private authorizationService: AuthorizationService,
        private httpErrorHandlingService: HttpErrorHandlingService,
        private loadingBlockService: LoadingBlockService,
        private router: Router,
        private actions$: Actions,
    ) { }
}
