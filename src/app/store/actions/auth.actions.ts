import { Action } from '@ngrx/store';

import { User } from '../../models/user/user.model';

export enum AuthActionTypes {
    Login = '[Auth] Login',
    Logout = '[Auth] Logout',
    Error = '[Auth] Error',
}

export class Login implements Action {
    readonly type: string = AuthActionTypes.Login;

    constructor(public payload: User) {}
}

export class Logout implements Action {
    readonly type: string = AuthActionTypes.Logout;
}

export class Error implements Action {
    readonly type: string = AuthActionTypes.Error;

    constructor(public payload) {}
}

export type AuthActions = Login | Logout | Error;
