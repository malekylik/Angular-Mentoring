import { Action } from '@ngrx/store';

import { User } from '../../models/user/user.model';

export enum UserActionTypes {
    GetUserInfo = '[User] GetUserInfo',
    SaveUserInfo = '[User] SaveUserInfo',
    ResetUserInfo = '[User] ResetUserInfo',
    Error = '[User] Error',
}

export class GetUserInfo implements Action {
    readonly type: string = UserActionTypes.GetUserInfo;
}

export class SaveUserInfo implements Action {
    readonly type: string = UserActionTypes.SaveUserInfo;

    constructor(public payload: User) {}
}

export class ResetUserInfo implements Action {
    readonly type: string = UserActionTypes.ResetUserInfo;
}

export class Error implements Action {
    readonly type: string = UserActionTypes.Error;

    constructor(public payload) {}
}

export type UserActions = SaveUserInfo | ResetUserInfo | Error;
