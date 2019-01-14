import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, tap, map, catchError, switchMap, finalize, concatMapTo } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

import { AuthActionTypes, AuthActions } from '../actions/auth.actions';
import { UserActions } from '../actions/user.actions';
import { AuthorizationService } from '../../modules/core/services/authorization/authorization.service';
import { Token } from '../../models/token.model';
import { User } from '../../models/user/user.model';
import { LoadingBlockService } from 'src/app/modules/core/services/loading-block/loading-block.service';
import { HttpErrorHandlingService } from 'src/app/modules/core/services/http-error-handling/http-error-handling.service';
import { CoursesActions } from '../actions/courses.actions';
import { ActionPayload } from 'src/app/modules/course/models/action-payload';

@Injectable()
export class AuthEffects {

    @Effect()
    login$: Observable<ActionPayload<User>> = this.actions$.pipe(
        ofType(AuthActionTypes.Login),
        tap(() => this.loadingBlockService.showLoadingBlock(true)),
        switchMap((action: ActionPayload<User>) => this.authorizationService.login(action.payload)
            .pipe(
                tap((token: Token) => this.authorizationService.storeToken(token.token)),
                mergeMap(() => this.authorizationService.getUserInfo()),
                tap(() => this.router.navigateByUrl('courses')),
                map((user: User) => UserActions.saveUserInfo(user)),
                catchError(error => {
                    this.httpErrorHandlingService.handlingError(error);
                    return of(AuthActions.error(error));
                }),
                finalize(() => this.loadingBlockService.showLoadingBlock(false)),
            )
        ),
    );

    @Effect()
    logout$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.Logout),
        tap(() => this.authorizationService.logout()),
        tap(() => this.router.navigateByUrl('auth')),
        concatMapTo([
            UserActions.resetUserInfo(),
            CoursesActions.resetCourses(),
        ]),
    );

    constructor(
        private authorizationService: AuthorizationService,
        private httpErrorHandlingService: HttpErrorHandlingService,
        private loadingBlockService: LoadingBlockService,
        private router: Router,
        private actions$: Actions,
    ) { }
}
