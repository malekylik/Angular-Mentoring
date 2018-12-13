import { Action } from '@ngrx/store';

import { User } from '../../models/user/user.model';

export enum AuthActionTypes {
    Login = '[Auth] Login',
    Logout = '[Auth] Logout',
    SaveUserInfo = '[Auth] SaveUserInfo',
    ResetUserInfo = '[Auth] ResetUserInfo',
}

export class Login implements Action {
    readonly type: string = AuthActionTypes.Login;

    constructor(public payload: User) {}
}

export class SaveUserInfo implements Action {
    readonly type: string = AuthActionTypes.SaveUserInfo;

    constructor(public payload: User) {}
}

export class ResetUserInfo implements Action {
    readonly type: string = AuthActionTypes.ResetUserInfo;
}

export class Error implements Action {
    readonly type: string = 'Error';
}

export type AuthActions = Login | ResetUserInfo;
